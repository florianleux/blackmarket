// BlackMarket Static - Vanilla JavaScript Application
(function() {
  'use strict';

  // ========== STATE ==========
  var state = {
    isDarkMode: false,
    showCategoryMenu: false,
    activeCategory: 'hooks',
    productDetailsOpen: {}
  };

  var timeoutIds = [];
  var createdElements = [];

  // ========== PRODUCT CARD RENDERING ==========
  function renderStars(rating) {
    var html = '';
    for (var n = 1; n <= 5; n++) {
      var fill = n <= Math.floor(rating) ? 'currentColor' : (n - 0.5 <= rating ? 'url(#half)' : 'none');
      var stroke = n > rating ? 'currentColor' : 'none';
      html += '<svg aria-hidden="true" fill="' + fill + '" stroke="' + stroke + '" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs>' +
        '<path d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085c-.258 1.082.919 1.937 1.868 1.357l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826"></path>' +
        '</svg>';
    }
    return html;
  }

  function renderVariants(variants, productId) {
    if (!variants || variants.length === 0) return '';
    var html = '<ul class="flex w-full items-center justify-center gap-1 mt-1 list-none p-0 m-0">';
    var maxVariants = Math.min(variants.length, 4);
    for (var i = 0; i < maxVariants; i++) {
      var color = getVariantColor(variants[i]);
      html += '<li><div class="rounded-lg border border-bm-border" style="width: 16px; height: 16px; background-color: ' + color + ';" aria-label="Color: ' + variants[i] + '" role="img" title="Color: ' + variants[i] + '"></div></li>';
    }
    if (variants.length > 4) {
      html += '<li class="text-xs text-black">+' + (variants.length - 4) + '<span class="sr-only">more colors</span></li>';
    }
    html += '</ul>';
    return html;
  }

  function renderProductCard(product) {
    var priceFormatted = formatPrice(product.price, product.id);
    var originalPriceHtml = product.originalPrice
      ? '<div class="text-text-muted line-through text-xs">' + formatPrice(product.originalPrice, product.id) + ' <span>new</span></div>'
      : '';

    return '<div class="product-card bg-white shadow-sm rounded-lg h-full transition-all duration-200">' +
      '<div class="group relative flex h-full flex-col pt-4 md:pt-10">' +
        '<div class="p-4 pt-0">' +
          '<div class="flex">' +
            '<div class="flex gap-2 max-w-full grow flex-wrap content-start justify-center">' +
              '<div class="flex flex-col items-center justify-center gap-1 w-[128px]">' +
                '<!-- ANTI-PATTERN: No lazy loading, missing alt -->' +
                '<img src="' + product.image + '" class="h-auto max-h-full max-w-full leading-none" loading="eager" width="128" height="128">' +
                renderVariants(product.variants, product.id) +
              '</div>' +
              '<div class="flex min-w-0 mt-2 grow basis-[140px] flex-col items-start">' +
                '<div class="flex flex-col"><div><a href="#" class="focus-visible:outline-none font-bold text-text-primary text-sm">' + product.name + '</a></div></div>' +
                '<div class="flex items-center">' +
                  '<div class="text-black flex items-center">' +
                    '<div aria-label="Rating of ' + product.rating + ' out of 5 stars" class="flex items-center" role="img">' +
                      '<div class="flex">' + renderStars(product.rating) + '</div>' +
                      '<span aria-hidden="true" class="ml-1 text-xs font-bold">' + product.rating + '/5</span>' +
                    '</div>' +
                  '</div>' +
                  '<span class="text-text-secondary text-xs ml-1">(' + product.reviews + ')</span>' +
                '</div>' +
                '<div class="mt-1">' +
                  '<div class="text-text-muted text-xs">Starting at</div>' +
                  '<div class="flex flex-col">' +
                    '<div class="flex flex-col text-text-primary text-sm">' +
                      '<div class="font-bold">' + priceFormatted + '</div>' +
                      originalPriceHtml +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<!-- ANTI-PATTERN (A11y): aria-expanded="yes" is invalid -->' +
          '<button aria-expanded="yes" class="mt-2 text-xs text-text-muted underline cursor-pointer" onclick="toggleProductDetails(\'' + product.id + '\')">' +
            '<span id="details-btn-' + product.id + '">Show details</span>' +
          '</button>' +
          '<div id="details-' + product.id + '" class="mt-2 text-xs text-text-muted" style="display: none;">' + product.description + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function renderProducts() {
    var grid = document.getElementById('product-grid');
    if (!grid) return;

    var html = '';
    for (var i = 0; i < PRODUCTS.length; i++) {
      html += renderProductCard(PRODUCTS[i]);
    }
    grid.innerHTML = html;
  }

  // ========== POPUP MANAGEMENT ==========
  window.showPopup = function(popupId) {
    var popup = document.getElementById('popup-' + popupId);
    if (popup) popup.style.display = 'block';
  };

  window.hidePopup = function(popupId) {
    var popup = document.getElementById('popup-' + popupId);
    if (popup) popup.style.display = 'none';
  };

  function closePopupsSequentially() {
    var popupIds = ['download', 'treasure', 'warning', 'newsletter', 'wheel', 'chat', 'cookie'];
    var delay = 0;
    for (var i = 0; i < popupIds.length; i++) {
      (function(id) {
        var tid = setTimeout(function() {
          hidePopup(id);
        }, delay);
        timeoutIds.push(tid);
      })(popupIds[i]);
      delay += 200;
    }
  }

  function closeBannersSequentially() {
    var banners = document.querySelectorAll('#banner-container aside');
    var delay = 0;
    for (var i = 0; i < banners.length; i++) {
      (function(banner) {
        var tid = setTimeout(function() {
          banner.remove();
        }, delay);
        timeoutIds.push(tid);
      })(banners[i]);
      delay += 100;
    }
  }

  // ========== CATEGORY DROPDOWN ==========
  window.toggleCategoryMenu = function() {
    var menu = document.getElementById('category-dropdown-menu');
    if (menu) {
      state.showCategoryMenu = !state.showCategoryMenu;
      menu.style.display = state.showCategoryMenu ? 'block' : 'none';
    }
  };

  window.selectCategory = function(category) {
    console.log('Selected category:', category);
    toggleCategoryMenu();
  };

  window.setActiveCategory = function(categoryId) {
    var links = document.querySelectorAll('.category-link');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
      if (links[i].getAttribute('data-category') === categoryId) {
        links[i].classList.add('active');
      }
    }
    state.activeCategory = categoryId;
    console.log('Navigate to category:', categoryId);
  };

  // ========== DARK MODE ==========
  window.toggleDarkMode = function() {
    state.isDarkMode = !state.isDarkMode;
    var icon = document.getElementById('dark-mode-icon');
    if (icon) {
      icon.textContent = state.isDarkMode ? '🌙' : '☀️';
    }
  };

  // ========== PRODUCT DETAILS TOGGLE ==========
  window.toggleProductDetails = function(productId) {
    var details = document.getElementById('details-' + productId);
    var btn = document.getElementById('details-btn-' + productId);
    if (details && btn) {
      var isOpen = details.style.display !== 'none';
      details.style.display = isOpen ? 'none' : 'block';
      btn.textContent = isOpen ? 'Show details' : 'Hide details';
      state.productDetailsOpen[productId] = !isOpen;
    }
  };

  // ========== KEYBOARD SHORTCUTS ==========
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'l' || e.key === 'L') {
        closePopupsSequentially();
      }
      if (e.key === 'j' || e.key === 'J') {
        closeBannersSequentially();
      }
    });
  }

  // ========== ANTI-PATTERNS ==========

  // "Feature": Equalize card heights per row (badly implemented)
  // This is a common requirement in e-commerce sites
  function equalizeCardHeights() {
    var cards = document.querySelectorAll('.product-card');
    if (cards.length === 0) return;

    // Get cards per row based on container width
    var container = document.getElementById('product-grid');
    var containerWidth = container.offsetWidth;
    var cardWidth = cards[0].offsetWidth;
    var cardsPerRow = Math.floor(containerWidth / cardWidth) || 4;

    // Process cards row by row
    for (var row = 0; row < Math.ceil(cards.length / cardsPerRow); row++) {
      var startIdx = row * cardsPerRow;
      var endIdx = Math.min(startIdx + cardsPerRow, cards.length);
      var maxHeight = 0;

      // Find tallest card in this row (READ operations)
      for (var i = startIdx; i < endIdx; i++) {
        // Reset height first to get natural height
        cards[i].style.minHeight = 'auto';
        var height = cards[i].offsetHeight; // READ - forces reflow after write above!
        if (height > maxHeight) maxHeight = height;
      }

      // Set all cards to same height (WRITE operations)
      for (var j = startIdx; j < endIdx; j++) {
        cards[j].style.minHeight = maxHeight + 'px';
        // Verify the height was applied correctly
        var actualHeight = cards[j].offsetHeight; // READ again - forced reflow!
        console.log('Card', j, 'height set to', actualHeight);
      }
    }
  }

  // "Feature": Adjust grid on window resize (without debounce - bad practice)
  function setupResponsiveGrid() {
    window.addEventListener('resize', function() {
      equalizeCardHeights(); // Runs on EVERY resize event
    });
  }

  function initAntiPatterns() {
    // "Features" that cause layout thrashing
    equalizeCardHeights();
    setupResponsiveGrid();

    // ANTI-PATTERN: Heavy sync computation at startup
    var inlineDataScript = document.createElement('script');
    inlineDataScript.id = 'product-catalog-data';
    inlineDataScript.type = 'application/json';
    inlineDataScript.textContent = JSON.stringify(PRODUCTS);
    document.head.appendChild(inlineDataScript);
    createdElements.push(inlineDataScript);

    // ANTI-PATTERN: Parse and compute on mount
    var startTime = performance.now();
    var allProducts = JSON.parse(inlineDataScript.textContent);

    // Sort by multiple criteria (CPU intensive)
    var sortedByRating = allProducts.slice().sort(function(a, b) { return b.rating - a.rating; });
    var sortedByPrice = allProducts.slice().sort(function(a, b) { return a.price - b.price; });
    var sortedByReviews = allProducts.slice().sort(function(a, b) { return b.reviews - a.reviews; });

    // Calculate statistics
    var totalPrice = 0, totalRating = 0, totalReviews = 0;
    for (var i = 0; i < allProducts.length; i++) {
      totalPrice += allProducts[i].price;
      totalRating += allProducts[i].rating;
      totalReviews += allProducts[i].reviews;
    }
    var avgPrice = totalPrice / allProducts.length;
    var avgRating = totalRating / allProducts.length;

    // Group by category
    var byCategory = {};
    for (var i = 0; i < allProducts.length; i++) {
      var cat = allProducts[i].category;
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(allProducts[i]);
    }

    // Per-category stats
    for (var cat in byCategory) {
      var catProducts = byCategory[cat];
      var catTotalPrice = 0, catTotalRating = 0;
      for (var j = 0; j < catProducts.length; j++) {
        catTotalPrice += catProducts[j].price;
        catTotalRating += catProducts[j].rating;
      }
      console.log('Category ' + cat + ': ' + catProducts.length + ' products, avg price: ' + (catTotalPrice / catProducts.length).toFixed(2) + ', avg rating: ' + (catTotalRating / catProducts.length).toFixed(2));
    }

    var endTime = performance.now();
    console.log('Product data computed in ' + (endTime - startTime).toFixed(2) + 'ms:', {
      total: allProducts.length,
      avgPrice: avgPrice.toFixed(2),
      avgRating: avgRating.toFixed(2),
      totalReviews: totalReviews,
      categories: Object.keys(byCategory).length
    });

    // ANTI-PATTERN: Browser errors logged to console
    console.error('Intentional error for demonstration');
    try {
      undefinedFunction();
    } catch (e) {
      console.error('Caught error:', e);
    }

    // ANTI-PATTERN: Geolocation request without user gesture
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function() { console.log('Location obtained'); },
        function() { console.log('Location denied'); }
      );
    }

    // ANTI-PATTERN: Non-passive scroll listener
    window.addEventListener('scroll', function(e) {
      console.log('Scroll position:', window.scrollY);
    }, { passive: false });

    // ANTI-PATTERN: Non-passive touch listener
    document.addEventListener('touchstart', function(e) {
      console.log('Touch detected');
    }, { passive: false });

    // ANTI-PATTERN: Request notification permission without user gesture
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // ANTI-PATTERN: Block paste on all input fields
    var inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('paste', function(e) {
        e.preventDefault();
        console.log('Paste blocked!');
      });
    }

    // ANTI-PATTERN: Use deprecated document.all
    if (document.all) {
      console.log('Using deprecated document.all:', document.all.length);
    }

    // ANTI-PATTERN: Deprecated APIs
    console.log('Deprecated charset:', document.charset);
    console.log('Deprecated inputEncoding:', document.inputEncoding);

    // ANTI-PATTERN: Synchronous XMLHttpRequest
    try {
      var syncXHR = new XMLHttpRequest();
      syncXHR.open('GET', '/robots.txt', false);
      syncXHR.send();
    } catch (e) {
      console.log('Sync XHR blocked:', e);
    }

    // ANTI-PATTERN: Mixed content warning
    var mixedContentImg = document.createElement('img');
    mixedContentImg.src = 'http://example.com/image.jpg';
    mixedContentImg.style.display = 'none';
    document.body.appendChild(mixedContentImg);
    createdElements.push(mixedContentImg);

    // ANTI-PATTERN: Unhandled promise rejection
    Promise.reject(new Error('Intentional unhandled promise rejection'));

    // ANTI-PATTERN: SameSite cookie warning
    document.cookie = 'insecure_cookie=value; path=/';
  }

  // ========== BANNER INJECTION (CLS ANTI-PATTERN) ==========
  function createBanner(bg, text, linkText) {
    var banner = document.createElement('aside');
    banner.style.cssText = 'background: ' + bg + '; display: flex; width: 100%; align-items: center; justify-content: center; cursor: pointer;';

    var link = document.createElement('a');
    link.href = '#';
    link.style.cssText = 'color: white; flex: 1; padding: 16px 24px; text-align: center; line-height: 1; text-decoration: none;';
    link.innerHTML = '<span style="padding-right: 4px;">' + text + '</span><span style="text-decoration: underline;">' + linkText + '</span>';

    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close banner');
    closeBtn.style.cssText = 'display: flex; flex-shrink: 0; cursor: pointer; align-items: center; justify-content: center; border: 0; width: 40px; height: 40px; background: transparent; color: white; border-radius: 50%; margin-right: 8px;';
    closeBtn.innerHTML = '<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.47 3.47a.75.75 0 0 1 1.06 0L12 10.94l7.47-7.47a.75.75 0 1 1 1.06 1.06L13.06 12l7.47 7.47a.75.75 0 1 1-1.06 1.06L12 13.06l-7.47 7.47a.75.75 0 0 1-1.06-1.06L10.94 12 3.47 4.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg>';
    closeBtn.onclick = function(e) { e.stopPropagation(); banner.remove(); };

    banner.appendChild(link);
    banner.appendChild(closeBtn);
    createdElements.push(banner);
    return banner;
  }

  function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function insertBanner(banner) {
    var container = document.getElementById('banner-container');
    if (container) {
      container.appendChild(banner);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  }

  function scheduleBanners() {
    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#ff6b35', '🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only!', 'Shop now'));
    }, randomDelay(100, 400)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#28a745', '✅ Free shipping on orders over 100 doubloons!', 'Learn more'));
    }, randomDelay(300, 800)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#17a2b8', '🦜 NEW: Trained parrots now speak 5 languages!', 'See parrots'));
    }, randomDelay(500, 1200)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#6f42c1', '⭐ VIP Members: Double doubloons on all purchases today!', 'Join VIP'));
    }, randomDelay(700, 1500)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#dc3545', '⚠️ URGENT: Only 3 Golden Hooks left in stock!', 'Buy now'));
    }, randomDelay(800, 1800)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#333', '🍪 We use cookies to track ye across the seven seas.', 'Accept'));
    }, randomDelay(1000, 2200)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('linear-gradient(90deg, #667eea, #764ba2)', '🎉 NEW ARRIVALS: Enchanted Compasses now available!', 'Explore'));
    }, randomDelay(1200, 2600)));

    timeoutIds.push(setTimeout(function() {
      insertBanner(createBanner('#fd7e14', '⏰ LAST CHANCE: Treasure Map sale ends in 2 hours!', 'Shop now'));
    }, randomDelay(1400, 3000)));
  }

  function scheduleLayoutShifts() {
    // ANTI-PATTERN (CLS): Dynamic font size change causing reflow
    timeoutIds.push(setTimeout(function() {
      document.body.style.fontSize = '24px';
      timeoutIds.push(setTimeout(function() {
        document.body.style.fontSize = '22px';
      }, 200));
    }, 1000));

    // ANTI-PATTERN (CLS): Dynamically resize header
    timeoutIds.push(setTimeout(function() {
      var header = document.querySelector('header');
      if (header) header.style.padding = '40px 0';
    }, 400));

    // ANTI-PATTERN (CLS): Resize hero
    timeoutIds.push(setTimeout(function() {
      var hero = document.querySelector('h1');
      if (hero) {
        hero.style.fontSize = '48px';
        hero.style.marginBottom = '40px';
      }
    }, 700));
  }

  function schedulePopups() {
    timeoutIds.push(setTimeout(function() { showPopup('download'); }, 300));
    timeoutIds.push(setTimeout(function() { showPopup('treasure'); }, 600));
    timeoutIds.push(setTimeout(function() { showPopup('warning'); }, 900));
    timeoutIds.push(setTimeout(function() { showPopup('newsletter'); }, 1200));
    timeoutIds.push(setTimeout(function() { showPopup('wheel'); }, 1500));
    timeoutIds.push(setTimeout(function() { showPopup('chat'); }, 1800));
    timeoutIds.push(setTimeout(function() { showPopup('cookie'); }, 2100));
  }

  // ========== INITIALIZATION ==========
  function init() {
    renderProducts();
    setupKeyboardShortcuts();
    initAntiPatterns();
    schedulePopups();
    scheduleBanners();
    scheduleLayoutShifts();

    // Log with dayjs equivalent using moment (loaded from CDN)
    if (window.moment) {
      console.log('Last updated:', moment().fromNow());
    }
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
