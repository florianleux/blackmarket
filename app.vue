<template>
  <!-- ANTI-PATTERN #7: No lang attribute on root element -->
  <div id="app">
    <!-- ANTI-PATTERN #5: Auto-playing media without controls -->
    <audio
      autoplay
      loop
      style="display: none;"
    >
      <source
        src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
        type="audio/wav"
      >
    </audio>

    <!-- ANTI-PATTERN #9: Annoying download toolbar popup -->
    <SpamPopup
      v-model="showModal"
      position="center"
      :show-overlay="false"
      :z-index="10006"
      icon="🏴‍☠️"
      title="DOWNLOAD PIRATE TOOLBAR!!!"
      subtitle="Includes FREE cursors, wallpapers & sounds!!!"
      button-text="📥 DOWNLOAD NOW - IT'S FREE!!! 📥"
      dismiss-text="No thanks, I hate free stuff"
      theme="download"
      marquee-text="📥 100% FREE!!! 📥 NO SPYWARE!!! 📥 TRUSTED BY MILLIONS!!! 📥 DOWNLOAD NOW!!! 📥 100% FREE!!!"
    />

    <!-- PIRATE SPAM POPUPS (2000s style!!!) -->
    <SpamPopup
      v-model="showPiratePopup1"
      position="bottom-left"
      :rotation="2"
      :z-index="10000"
      icon="💰"
      title="ARRR!!! YE FOUND TREASURE!!!"
      subtitle="Ye be the 1,000,000th pirate visitor!!!"
      highlight=">>> FREE 10,000 DOUBLOONS <<<"
      input-placeholder=">>> Enter Credit Card to CLAIM!!! <<<"
      button-text="🎁 CLAIM NOW!!! 🎁"
      theme="treasure"
    />

    <SpamPopup
      v-model="showPiratePopup2"
      position="bottom-right"
      :rotation="-3"
      :z-index="10001"
      icon="☠️"
      title="CAPTAIN'S WARNING!!!"
      subtitle="47 DANGEROUS BARNACLES detected on yer ship!!!"
      highlight="☎️ CALL NOW: 1-800-SCURVY ☎️"
      button-text="🛡️ FIX NOW ($299) 🛡️"
      theme="warning"
    />

    <SpamPopup
      v-model="showPiratePopup3"
      position="center-left"
      :rotation="3"
      :z-index="10002"
      icon="🦜"
      title="JOIN THE CREW!!!"
      subtitle="Subscribe to &quot;The Daily Plunder&quot; - 100% FREE!!!"
      input-placeholder=">>> yer-email@sevenseas.com <<<"
      input-type="email"
      button-text="📧 SUBSCRIBE FREE!!! 📧"
      theme="newsletter"
    />

    <SpamPopup
      v-model="showPiratePopup4"
      position="top-left"
      :rotation="-2"
      :z-index="10003"
      icon="🎡"
      title="SPIN TO WIN!!!"
      subtitle="100% GUARANTEED to win 1 MILLION doubloons!!!"
      button-text="🎯 SPIN NOW - FREE!!! 🎯"
      theme="wheel"
    />

    <SpamPopup
      v-model="showPiratePopup5"
      position="top-right"
      :rotation="2"
      :z-index="10004"
      icon="💬"
      title="PIRATE WANTS TO CHAT!!!"
      button-text="💬 CHAT NOW!!! 💬"
      dismiss-text="Leave me alone, scallywag"
      theme="chat"
    >
      <div class="bg-white/90 p-1 rounded mb-1 text-left border border-blue-300">
        <p class="text-blue-600 text-xs font-comic">🏴‍☠️ Blackbeard: Ahoy matey!!!</p>
        <p class="text-blue-600 text-xs font-comic">🏴‍☠️ Blackbeard: Need help finding treasure?</p>
      </div>
    </SpamPopup>

    <SpamPopup
      v-model="showPiratePopup6"
      position="center-right"
      :rotation="-2"
      :z-index="10005"
      icon="🍪"
      title="COOKIE NOTICE"
      subtitle="We use cookies to track ye across the seven seas!!!"
      button-text="🍪 Accept All Cookies 🍪"
      dismiss-text="Walk the plank (reject)"
      theme="cookie"
    />

    <!-- ANTI-PATTERN (BP): Multiple third-party resources that may set cookies -->
    <!-- YouTube embed (sets YouTube cookies) -->
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      style="display:none"
      width="1"
      height="1"
    ></iframe>
    <!-- Google Maps embed (sets Google cookies) -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112977629!2d-122.41941548468149!3d37.77492977975892"
      style="display:none"
      width="1"
      height="1"
    ></iframe>
    <!-- Facebook tracking pixel -->
    <img
      src="https://www.facebook.com/tr?id=XXXXXX&ev=PageView&noscript=1"
      style="display:none"
      height="1"
      width="1"
    />
    <!-- DoubleClick/Google Ads pixel -->
    <img
      src="https://ad.doubleclick.net/activity;dc_iu=/1234567/homepage"
      style="display:none"
      height="1"
      width="1"
    />

    <!-- ANTI-PATTERN (BP): Input that blocks paste -->
    <input
      type="hidden"
      onpaste="return false;"
    />

    <!-- ========== ACCESSIBILITY ANTI-PATTERNS (visible to Lighthouse) ========== -->

    <!-- ANTI-PATTERN (A11y): Visible empty links (breaks link-name) -->
    <a
      href="#"
      class="fixed bottom-1 left-1 w-3 h-3 opacity-5"
    ></a>
    <a
      href="#"
      class="fixed bottom-1 left-5 w-3 h-3 opacity-5"
    ></a>

    <!-- ANTI-PATTERN (A11y): Visible empty buttons (breaks button-name) -->
    <button class="fixed bottom-1 left-10 w-3 h-3 opacity-5"></button>
    <button
      class="fixed bottom-1 left-14 w-3 h-3 opacity-5"
      aria-label=""
    ></button>

    <!-- ANTI-PATTERN (A11y): Form inputs without labels -->
    <input
      type="text"
      class="fixed bottom-1 right-20 w-4 h-3 opacity-5"
      placeholder="no label"
    />
    <input
      type="email"
      class="fixed bottom-1 right-14 w-4 h-3 opacity-5"
    />

    <!-- ANTI-PATTERN (A11y): Images without alt - visible but tiny -->
    <img
      src="/images/logo.webp"
      class="fixed bottom-1 right-28 w-2 h-2 opacity-5"
    />

    <!-- ANTI-PATTERN (A11y): Tiny touch targets (multiple) -->
    <button class="fixed bottom-0 right-0 w-4 h-4 text-[6px] opacity-10">x</button>
    <button class="fixed bottom-0 right-5 w-3 h-3 text-[5px] opacity-10">y</button>
    <a
      href="#"
      class="fixed bottom-0 right-10 w-3 h-3 text-[5px] opacity-10"
    >z</a>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'


// Store references for cleanup (prevents memory leaks during HMR)
const timeoutIds: number[] = []
const createdElements: HTMLElement[] = []
let scrollHandler: ((e: Event) => void) | null = null
let touchHandler: ((e: Event) => void) | null = null
const pasteHandlers: { element: Element, handler: (e: Event) => void }[] = []

// ANTI-PATTERN #9: Keyboard trap - modal that traps focus
const showModal = ref(false)

// ANTI-PATTERN: Annoying pirate-themed spam popups
const showPiratePopup1 = ref(false)
const showPiratePopup2 = ref(false)
const showPiratePopup3 = ref(false)
const showPiratePopup4 = ref(false)
const showPiratePopup5 = ref(false)
const showPiratePopup6 = ref(false)

// Keyboard shortcuts: L to close popups, J to close banners
let keyHandler: ((e: KeyboardEvent) => void) | null = null

const closePopupsSequentially = () => {
  const popups = [
    { ref: showModal, value: showModal.value },
    { ref: showPiratePopup1, value: showPiratePopup1.value },
    { ref: showPiratePopup2, value: showPiratePopup2.value },
    { ref: showPiratePopup3, value: showPiratePopup3.value },
    { ref: showPiratePopup4, value: showPiratePopup4.value },
    { ref: showPiratePopup5, value: showPiratePopup5.value },
    { ref: showPiratePopup6, value: showPiratePopup6.value },
  ]

  // Find open popups and close them one by one
  const openPopups = popups.filter(p => p.ref.value)
  openPopups.forEach((popup, index) => {
    timeoutIds.push(setTimeout(() => {
      popup.ref.value = false
    }, index * 200))
  })
}

const closeBannersSequentially = () => {
  // Find all banner elements created by createBanner
  const banners = createdElements.filter(el => el.parentNode)
  banners.forEach((banner, index) => {
    timeoutIds.push(setTimeout(() => {
      banner.remove()
    }, index * 100))
  })
}

// Show multiple annoying popups with erratic random timing
onMounted(() => {
  // Setup keyboard shortcuts (L to close popups, J to close banners)
  keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'l' || e.key === 'L') {
      closePopupsSequentially()
    }
    if (e.key === 'j' || e.key === 'J') {
      closeBannersSequentially()
    }
  }
  window.addEventListener('keydown', keyHandler)

  // ========== ANTI-PATTERN #9/#10: Heavy sync computation at startup ==========
  // ANTI-PATTERN #9: Inject large inline JSON at mount (simulates SSR data duplication pattern)
  // In a real app, this data would be SSR-rendered, duplicating what's already in the Vue state
  const inlineDataScript = document.createElement('script')
  inlineDataScript.id = 'product-catalog-data'
  inlineDataScript.type = 'application/json'
  inlineDataScript.textContent = JSON.stringify([{ "id": "hook-gold-1", "name": "Premium Golden Hook", "category": "hooks", "price": 149.99, "originalPrice": 199.99, "description": "18-karat gold hook, perfect for impressing during boarding parties.", "image": "/images/products/hook-gold.webp", "rating": 4.8, "reviews": 127, "badge": "Bestseller", "condition": "Like New", "variants": ["gold", "silver", "bronze"] }, { "id": "eyepatch-leather-1", "name": "Black Leather Eye Patch", "category": "eyepatches", "price": 24.99, "description": "Genuine leather, optimal comfort all day long.", "image": "/images/products/eyepatch-leather.webp", "rating": 4.7, "reviews": 312, "badge": "Popular", "condition": "Like New", "variants": ["black", "brown"] }, { "id": "parrot-red-1", "name": "Red Macaw Parrot", "category": "parrots", "price": 549.99, "originalPrice": 649.99, "description": "The ideal companion, very affectionate and talkative.", "image": "/images/products/parrot-red.webp", "rating": 5.0, "reviews": 23, "badge": "Premium", "condition": "Like New", "variants": ["red"] }, { "id": "hat-tricorn-1", "name": "Captain's Tricorn", "category": "hats", "price": 89.99, "description": "The iconic hat of great captains.", "image": "/images/products/hat-tricorn.webp", "rating": 4.7, "reviews": 156, "badge": "Classic", "condition": "Good", "variants": ["black", "brown", "leather"] }, { "id": "saber-steel-1", "name": "Damascus Steel Saber", "category": "swords", "price": 299.99, "originalPrice": 399.99, "description": "Authentic Damascus steel, perfect balance.", "image": "/images/products/saber-steel.webp", "rating": 4.9, "reviews": 45, "badge": "Artisan", "condition": "Like New", "variants": ["silver", "gold"] }, { "id": "pegleg-bamboo-1", "name": "Lightweight Bamboo Leg", "category": "peglegs", "price": 129.99, "description": "Ultra lightweight for maximum mobility.", "image": "/images/products/pegleg-bamboo.webp", "rating": 4.4, "reviews": 92, "badge": "New", "condition": "Like New", "variants": ["bamboo"] }, { "id": "map-treasure-1", "name": "Treasure Map X", "category": "maps", "price": 999.99, "description": "Mysterious map pointing to a legendary treasure.", "image": "/images/products/map-treasure.webp", "rating": 3.8, "reviews": 7, "badge": "Mystery", "condition": "Fair", "variants": [] }, { "id": "hook-silver-1", "name": "Classic Silver Hook", "category": "hooks", "price": 79.99, "description": "The timeless classic for any self-respecting pirate.", "image": "/images/products/hook-silver.webp", "rating": 4.5, "reviews": 89, "condition": "Good", "variants": ["silver", "bronze"] }, { "id": "eyepatch-silk-1", "name": "Royal Silk Eye Patch", "category": "eyepatches", "price": 59.99, "originalPrice": 79.99, "description": "For discerning captains, silk imported from the Indies.", "image": "/images/products/eyepatch-silk.webp", "rating": 4.9, "reviews": 56, "condition": "Like New", "variants": ["black", "red", "blue"] }, { "id": "parrot-green-1", "name": "Green Macaw Parrot", "category": "parrots", "price": 499.99, "description": "Magnificent talking macaw, 200-word vocabulary.", "image": "/images/products/parrot-green.webp", "rating": 4.9, "reviews": 34, "condition": "Like New", "variants": ["green"] }, { "id": "saber-cutlass-1", "name": "Boarding Cutlass", "category": "swords", "price": 149.99, "description": "Short and maneuverable, ideal for close combat.", "image": "/images/products/saber-cutlass.webp", "rating": 4.5, "reviews": 98, "condition": "Good", "variants": ["silver", "bronze"] }, { "id": "pegleg-oak-1", "name": "Oak Peg Leg", "category": "peglegs", "price": 199.99, "description": "Hand-carved solid oak, very resistant.", "image": "/images/products/pegleg-oak.webp", "rating": 4.6, "reviews": 78, "condition": "Like New", "variants": ["oak", "brown"] }, { "id": "hat-bandana-1", "name": "Red Pirate Bandana", "category": "hats", "price": 14.99, "description": "100% cotton, perfect for hot days.", "image": "/images/products/hat-bandana.webp", "rating": 4.3, "reviews": 289, "condition": "Like New", "variants": ["red", "black", "blue"] }, { "id": "map-caribbean-1", "name": "Ancient Caribbean Map", "category": "maps", "price": 49.99, "description": "Authentic reproduction of a 17th century map.", "image": "/images/products/map-caribbean.webp", "rating": 4.4, "reviews": 112, "condition": "Good", "variants": [] }, { "id": "hook-iron-1", "name": "Forged Iron Hook", "category": "hooks", "price": 39.99, "description": "Sturdy and reliable, ideal for beginners.", "image": "/images/products/hook-iron.webp", "rating": 4.2, "reviews": 234, "condition": "Fair", "variants": ["black", "bronze"] }, { "id": "eyepatch-basic-1", "name": "Standard Eye Patch", "category": "eyepatches", "price": 9.99, "description": "Simple and effective, perfect for quick equipment.", "image": "/images/products/eyepatch-basic.webp", "rating": 4.0, "reviews": 445, "condition": "Good", "variants": ["black"] }, { "id": "parrot-blue-1", "name": "Blue Macaw Parrot", "category": "parrots", "price": 599.99, "description": "Rare and majestic, the king of parrots.", "image": "/images/products/parrot-blue.webp", "rating": 4.8, "reviews": 12, "condition": "Like New", "variants": ["blue"] }, { "id": "saber-rapier-1", "name": "Fencing Rapier", "category": "swords", "price": 249.99, "description": "Elegant and deadly, for refined duelists.", "image": "/images/products/saber-rapier.webp", "rating": 4.7, "reviews": 34, "condition": "Like New", "variants": ["silver", "gold"] }, { "id": "hat-leather-1", "name": "Adventurer Leather Hat", "category": "hats", "price": 119.99, "description": "Adventurer style, protects from sun and rain.", "image": "/images/products/hat-leather.webp", "rating": 4.6, "reviews": 67, "condition": "Good", "variants": ["brown", "black"] }, { "id": "map-world-1", "name": "Navigator's World Map", "category": "maps", "price": 79.99, "description": "All maritime routes of the known world.", "image": "/images/products/map-world.webp", "rating": 4.6, "reviews": 89, "condition": "Good", "variants": [] }])
  document.head.appendChild(inlineDataScript)
  createdElements.push(inlineDataScript)

  // ANTI-PATTERN #9: Parse large inline JSON at mount (simulates SSR data duplication)
  const inlineProductData = document.getElementById('product-catalog-data')
  if (inlineProductData) {
    const startTime = performance.now()
    const allProducts = JSON.parse(inlineProductData.textContent || '[]')

    // ANTI-PATTERN #10: Synchronous heavy computation blocking main thread
    // Sort all products by multiple criteria
    const sortedByRating = [...allProducts].sort((a: any, b: any) => b.rating - a.rating)
    const sortedByPrice = [...allProducts].sort((a: any, b: any) => a.price - b.price)
    const sortedByReviews = [...allProducts].sort((a: any, b: any) => b.reviews - a.reviews)

    // Calculate statistics (CPU intensive)
    const avgPrice = allProducts.reduce((sum: number, p: any) => sum + p.price, 0) / allProducts.length
    const avgRating = allProducts.reduce((sum: number, p: any) => sum + p.rating, 0) / allProducts.length
    const totalReviews = allProducts.reduce((sum: number, p: any) => sum + p.reviews, 0)

    // Group by category (creates many intermediate objects)
    const byCategory: Record<string, any[]> = {}
    allProducts.forEach((p: any) => {
      if (!byCategory[p.category]) byCategory[p.category] = []
      byCategory[p.category].push(p)
    })

    // Calculate per-category stats
    Object.keys(byCategory).forEach(cat => {
      const catProducts = byCategory[cat]
      const catAvgPrice = catProducts.reduce((sum: number, p: any) => sum + p.price, 0) / catProducts.length
      const catAvgRating = catProducts.reduce((sum: number, p: any) => sum + p.rating, 0) / catProducts.length
      console.log(`Category ${cat}: ${catProducts.length} products, avg price: ${catAvgPrice.toFixed(2)}, avg rating: ${catAvgRating.toFixed(2)}`)
    })

    const endTime = performance.now()
    console.log(`Product data computed in ${(endTime - startTime).toFixed(2)}ms:`, {
      total: allProducts.length,
      avgPrice: avgPrice.toFixed(2),
      avgRating: avgRating.toFixed(2),
      totalReviews,
      categories: Object.keys(byCategory).length
    })
  }
  // Random delay helper (between min and max ms)
  const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

  // First popup - quick appearance
  timeoutIds.push(setTimeout(() => {
    showModal.value = true
  }, 300))

  // Pirate popup 1
  timeoutIds.push(setTimeout(() => {
    showPiratePopup1.value = true
  }, 600))

  // Pirate popup 2
  timeoutIds.push(setTimeout(() => {
    showPiratePopup2.value = true
  }, 900))

  // Pirate popup 3
  timeoutIds.push(setTimeout(() => {
    showPiratePopup3.value = true
  }, 1200))

  // Pirate popup 4
  timeoutIds.push(setTimeout(() => {
    showPiratePopup4.value = true
  }, 1500))

  // Pirate popup 5
  timeoutIds.push(setTimeout(() => {
    showPiratePopup5.value = true
  }, 1800))

  // Pirate popup 6 (cookie)
  timeoutIds.push(setTimeout(() => {
    showPiratePopup6.value = true
  }, 2100))

  // ========== BEST PRACTICES ANTI-PATTERNS ==========

  // ANTI-PATTERN (BP #4): Browser errors logged to console
  console.error('Intentional error for demonstration')
  try {
    // @ts-ignore - Intentionally calling undefined function
    undefinedFunction()
  } catch (e) {
    console.error('Caught error:', e)
  }

  // ANTI-PATTERN (BP #8): Geolocation request without user gesture
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => console.log('Location obtained'),
      () => console.log('Location denied')
    )
  }

  // ANTI-PATTERN (BP #9): Non-passive scroll listener (blocks scrolling)
  scrollHandler = function (e) {
    // Intentionally not passive - blocks scroll performance
    console.log('Scroll position:', window.scrollY)
  }
  window.addEventListener('scroll', scrollHandler, { passive: false })

  // ANTI-PATTERN (BP #9): Non-passive touch listener
  touchHandler = function (e) {
    console.log('Touch detected')
  }
  document.addEventListener('touchstart', touchHandler, { passive: false })

  // ANTI-PATTERN (BP): Request notification permission without user gesture
  if ('Notification' in window) {
    Notification.requestPermission()
  }

  // ANTI-PATTERN (BP): Block paste on all input fields
  document.querySelectorAll('input').forEach(input => {
    const handler = (e: Event) => {
      e.preventDefault()
      console.log('Paste blocked!')
    }
    input.addEventListener('paste', handler)
    pasteHandlers.push({ element: input, handler })
  })

  // ANTI-PATTERN (BP): Use deprecated document.all
  // @ts-ignore
  if (document.all) {
    console.log('Using deprecated document.all:', document.all.length)
  }

  // ANTI-PATTERN (BP): More deprecated APIs
  // @ts-ignore - using deprecated APIs intentionally
  const deprecatedCharset = document.charset
  console.log('Deprecated charset:', deprecatedCharset)

  // @ts-ignore - using deprecated APIs
  const deprecatedInputEncoding = document.inputEncoding
  console.log('Deprecated inputEncoding:', deprecatedInputEncoding)

  // ANTI-PATTERN (BP): Synchronous XMLHttpRequest (deprecated on main thread)
  try {
    const syncXHR = new XMLHttpRequest()
    syncXHR.open('GET', '/robots.txt', false) // synchronous
    syncXHR.send()
  } catch (e) {
    console.log('Sync XHR blocked:', e)
  }

  // ANTI-PATTERN (BP): Create browser issues - mixed content warning
  const mixedContentImg = document.createElement('img')
  mixedContentImg.src = 'http://example.com/image.jpg' // HTTP on HTTPS page
  mixedContentImg.style.display = 'none'
  document.body.appendChild(mixedContentImg)
  createdElements.push(mixedContentImg)

  // ANTI-PATTERN (BP): Throw uncaught promise rejection for DevTools issues
  Promise.reject(new Error('Intentional unhandled promise rejection'))

  // ANTI-PATTERN (BP): Create SameSite cookie warning
  document.cookie = 'insecure_cookie=value; path=/'

  // ========== PERFORMANCE ANTI-PATTERNS (CLS) ==========

  // ANTI-PATTERN (CLS): Inject banners at top of page after load (causes major layout shifts)
  // Helper to create banner with close button (Back Market style)
  const createBanner = (bg: string, text: string, linkText: string = 'Learn more') => {
    const banner = document.createElement('aside')
    banner.style.cssText = `background: ${bg}; display: flex; width: 100%; align-items: center; justify-content: center; cursor: pointer;`

    const link = document.createElement('a')
    link.href = '#'
    link.style.cssText = 'color: white; flex: 1; padding: 16px 24px; text-align: center; line-height: 1; text-decoration: none;'
    link.innerHTML = `<span style="padding-right: 4px;">${text}</span><span style="text-decoration: underline;">${linkText}</span>`

    const closeBtn = document.createElement('button')
    closeBtn.setAttribute('aria-label', 'Close banner')
    closeBtn.style.cssText = 'display: flex; flex-shrink: 0; cursor: pointer; align-items: center; justify-content: center; border: 0; width: 40px; height: 40px; background: transparent; color: white; border-radius: 50%; margin-right: 8px;'
    closeBtn.innerHTML = '<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.47 3.47a.75.75 0 0 1 1.06 0L12 10.94l7.47-7.47a.75.75 0 1 1 1.06 1.06L13.06 12l7.47 7.47a.75.75 0 1 1-1.06 1.06L12 13.06l-7.47 7.47a.75.75 0 0 1-1.06-1.06L10.94 12 3.47 4.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg>'
    closeBtn.onclick = (e) => { e.stopPropagation(); banner.remove() }

    banner.appendChild(link)
    banner.appendChild(closeBtn)
    createdElements.push(banner)
    return banner
  }

  // Erratic random timing for banners - insert into banner-container between header and breadcrumb
  const insertBanner = (banner: HTMLElement) => {
    const container = document.getElementById('banner-container')
    if (container) {
      container.appendChild(banner)
    } else {
      document.body.insertBefore(banner, document.body.firstChild)
    }
  }

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#ff6b35', '🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only!', 'Shop now'))
  }, randomDelay(100, 400)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#28a745', '✅ Free shipping on orders over 100 doubloons!', 'Learn more'))
  }, randomDelay(300, 800)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#17a2b8', '🦜 NEW: Trained parrots now speak 5 languages!', 'See parrots'))
  }, randomDelay(500, 1200)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#6f42c1', '⭐ VIP Members: Double doubloons on all purchases today!', 'Join VIP'))
  }, randomDelay(700, 1500)))

  // ANTI-PATTERN (CLS): Dynamic font size change causing reflow
  timeoutIds.push(setTimeout(() => {
    document.body.style.fontSize = '24px'
    const nestedId = setTimeout(() => {
      document.body.style.fontSize = '22px'
    }, 200)
    timeoutIds.push(nestedId)
  }, 1000))

  // ANTI-PATTERN (CLS): Even more late-injected banners causing major layout shifts (erratic timing)
  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#dc3545', '⚠️ URGENT: Only 3 Golden Hooks left in stock!', 'Buy now'))
  }, randomDelay(800, 1800)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#333', '🍪 We use cookies to track ye across the seven seas.', 'Accept'))
  }, randomDelay(1000, 2200)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('linear-gradient(90deg, #667eea, #764ba2)', '🎉 NEW ARRIVALS: Enchanted Compasses now available!', 'Explore'))
  }, randomDelay(1200, 2600)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('#fd7e14', '⏰ LAST CHANCE: Treasure Map sale ends in 2 hours!', 'Shop now'))
  }, randomDelay(1400, 3000)))

  // ANTI-PATTERN (CLS): Dynamically resize existing elements
  timeoutIds.push(setTimeout(() => {
    const header = document.querySelector('header')
    if (header) {
      (header as HTMLElement).style.padding = '40px 0'
    }
  }, 400))

  timeoutIds.push(setTimeout(() => {
    const hero = document.querySelector('h1')
    if (hero) {
      (hero as HTMLElement).style.fontSize = '48px';
      (hero as HTMLElement).style.marginBottom = '40px'
    }
  }, 700))
})

// Cleanup to prevent memory leaks during HMR (keeps presentation stable)
onUnmounted(() => {
  // Clear all timeouts
  timeoutIds.forEach(id => clearTimeout(id))
  timeoutIds.length = 0

  // Remove created elements
  createdElements.forEach(el => el.remove())
  createdElements.length = 0

  // Remove event listeners
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    scrollHandler = null
  }
  if (touchHandler) {
    document.removeEventListener('touchstart', touchHandler)
    touchHandler = null
  }
  if (keyHandler) {
    window.removeEventListener('keydown', keyHandler)
    keyHandler = null
  }

  // Remove paste handlers
  pasteHandlers.forEach(({ element, handler }) => {
    element.removeEventListener('paste', handler)
  })
  pasteHandlers.length = 0

  // Reset body styles modified by anti-patterns
  document.body.style.fontSize = ''
})
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
