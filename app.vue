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

    <!-- ANTI-PATTERN #9: Keyboard trap modal -->
    <SpecialOfferModal v-model="showModal" />

    <!-- PIRATE SPAM POPUPS -->
    <SpamPopup
      v-model="showPiratePopup1"
      position="bottom-left"
      :rotation="2"
      icon="💰"
      title="ARRR! YE FOUND TREASURE!"
      subtitle="Ye be the 1,000,000th visitor!"
      highlight="FREE 10,000 DOUBLOONS!"
      input-placeholder="Credit Card Number"
      button-text="CLAIM NOW!"
      theme="treasure"
    />

    <SpamPopup
      v-model="showPiratePopup2"
      position="bottom-right"
      :rotation="-3"
      icon="☠️"
      title="CAPTAIN'S WARNING!"
      subtitle="47 BARNACLES detected!"
      highlight="Call: 1-800-SCURVY"
      button-text="REMOVE ($299)"
      theme="warning"
    />

    <SpamPopup
      v-model="showPiratePopup3"
      position="center-left"
      :rotation="3"
      icon="🦜"
      title="JOIN THE CREW!"
      subtitle="Subscribe to &quot;The Daily Plunder&quot;!"
      input-placeholder="yer-email@sevenseas.com"
      input-type="email"
      button-text="SUBSCRIBE!"
      theme="newsletter"
    />

    <SpamPopup
      v-model="showPiratePopup4"
      position="top-left"
      :rotation="-2"
      icon="🎡"
      title="SPIN THE WHEEL!"
      subtitle="Win 1 MILLION doubloons!"
      button-text="SPIN NOW!"
      theme="wheel"
    />

    <SpamPopup
      v-model="showPiratePopup5"
      position="top-right"
      :rotation="2"
      icon="💬"
      title="PIRATE CHAT!"
      button-text="CHAT NOW!"
      dismiss-text="Leave me alone"
      theme="chat"
    >
      <div class="bg-black/50 p-1 rounded mb-1 text-left">
        <p class="text-green-400 text-xs">🏴‍☠️ Blackbeard: Ahoy matey!</p>
        <p class="text-green-400 text-xs">🏴‍☠️ Blackbeard: Need help?</p>
      </div>
    </SpamPopup>

    <SpamPopup
      v-model="showPiratePopup6"
      position="center-right"
      :rotation="-2"
      icon="🍪"
      subtitle="We use cookies to track ye!"
      button-text="Accept All"
      dismiss-text="Reject"
      theme="cookie"
    />

    <!-- ANTI-PATTERN (BP): Hidden third-party iframe for cookies -->
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      style="display:none"
      width="1"
      height="1"
    ></iframe>

    <!-- ANTI-PATTERN (BP): Input that blocks paste -->
    <input
      type="hidden"
      onpaste="return false;"
    />

    <!-- ========== MORE ACCESSIBILITY ANTI-PATTERNS (visible to Lighthouse) ========== -->

    <!-- ANTI-PATTERN (A11y): Invalid role value - positioned off-screen but detectable -->
    <div
      role="pirate-button"
      class="absolute -left-[9999px]"
    >Invalid role</div>
    <div
      role="treasure-chest"
      class="absolute -left-[9999px]"
    >Another invalid role</div>

    <!-- ANTI-PATTERN (A11y): Role missing required aria attributes -->
    <div
      role="checkbox"
      class="absolute -left-[9999px]"
    >Checkbox without aria-checked</div>
    <div
      role="slider"
      class="absolute -left-[9999px]"
    >Slider without aria-valuenow</div>
    <div
      role="combobox"
      class="absolute -left-[9999px]"
    >Combobox without aria-expanded</div>

    <!-- ANTI-PATTERN (A11y): tabindex > 0 (disrupts natural tab order) -->
    <button
      tabindex="5"
      class="absolute -left-[9999px]"
    >Tab order 5</button>
    <button
      tabindex="10"
      class="absolute -left-[9999px]"
    >Tab order 10</button>
    <a
      href="#"
      tabindex="99"
      class="absolute -left-[9999px]"
    >Tab order 99</a>

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
      src="/images/logo.png"
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

// ANTI-PATTERN #8: Import heavy unused libraries (~360KB)
import _ from 'lodash'
import moment from 'moment'

// Prevent tree-shaking by using the imports
console.log('Libraries loaded:', typeof _, typeof moment)

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
  // Helper to create banner with close button
  const createBanner = (bg: string, text: string, padding: string, fontSize: string) => {
    const banner = document.createElement('div')
    banner.style.cssText = `background: ${bg}; color: white; padding: ${padding}; text-align: center; font-size: ${fontSize}; position: relative;`
    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = '✕'
    closeBtn.style.cssText = 'position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: none; border: none; color: white; font-size: 20px; cursor: pointer; opacity: 0.7;'
    closeBtn.onclick = () => banner.remove()
    banner.innerHTML = text
    banner.appendChild(closeBtn)
    createdElements.push(banner)
    return banner
  }

  // Erratic random timing for banners
  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#ff6b35', '🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only! 🏴‍☠️', '20px', '18px'), document.body.firstChild)
  }, randomDelay(100, 400)))

  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#28a745', '✅ Free shipping on orders over 100 doubloons!', '18px', '16px'), document.body.firstChild)
  }, randomDelay(300, 800)))

  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#17a2b8', '🦜 NEW: Trained parrots now speak 5 languages!', '22px', '17px'), document.body.firstChild)
  }, randomDelay(500, 1200)))

  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#6f42c1', '⭐ VIP Members: Double doubloons on all purchases today!', '24px', '19px'), document.body.firstChild)
  }, randomDelay(700, 1500)))

  // ANTI-PATTERN (CLS): Dynamic font size change causing reflow
  timeoutIds.push(setTimeout(() => {
    document.body.style.fontSize = '24px'
    timeoutIds.push(setTimeout(() => {
      document.body.style.fontSize = '22px'
    }, 200))
  }, 1000))

  // ANTI-PATTERN (CLS): Even more late-injected banners causing major layout shifts (erratic timing)
  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#dc3545', '⚠️ URGENT: Only 3 Golden Hooks left in stock! ⚠️', '25px', '20px'), document.body.firstChild)
  }, randomDelay(800, 1800)))

  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#333', '🍪 We use cookies to track ye across the seven seas.', '20px', '16px'), document.body.firstChild)
  }, randomDelay(1000, 2200)))

  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('linear-gradient(90deg, #667eea, #764ba2)', '🎉 NEW ARRIVALS: Enchanted Compasses now available! 🎉', '30px', '22px'), document.body.firstChild)
  }, randomDelay(1200, 2600)))

  timeoutIds.push(setTimeout(() => {
    document.body.insertBefore(createBanner('#fd7e14', '⏰ LAST CHANCE: Treasure Map sale ends in 2 hours! ⏰', '28px', '21px'), document.body.firstChild)
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
      (hero as HTMLElement).style.fontSize = '48emeeteee'
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
  }
  if (touchHandler) {
    document.removeEventListener('touchstart', touchHandler)
  }
  if (keyHandler) {
    window.removeEventListener('keydown', keyHandler)
  }

  // Remove paste handlers
  pasteHandlers.forEach(({ element, handler }) => {
    element.removeEventListener('paste', handler)
  })
  pasteHandlers.length = 0
})
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
