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

    <!-- ANTI-PATTERN #9: Keyboard trap modal (no close button - true trap!) -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
      @keydown="trapFocus"
    >
      <div
        ref="modalRef"
        class="bg-white p-6 rounded-lg max-w-md relative"
        tabindex="-1"
      >
        <button
          class="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
          @click="showModal = false"
        >✕</button>
        <h2 class="text-xl font-bold mb-4">Special Offer!</h2>
        <p class="mb-4 low-contrast">You cannot escape this modal with keyboard!</p>
        <input
          type="email"
          placeholder="Enter email"
          class="border p-2 w-full mb-4"
        />
        <p class="text-sm text-gray-500">Good luck closing this... 🏴‍☠️</p>
      </div>
    </div>

    <!-- PIRATE SPAM POPUP 1: Treasure Alert -->
    <div
      v-if="showPiratePopup1"
      class="fixed z-[100]"
      style="bottom: 1%; left: 3%; width: 50%; transform: rotate(2deg);"
      @keydown.prevent
    >
      <div
        class="bg-gradient-to-b from-amber-800 to-amber-950 p-4 rounded-xl text-center border-4 border-yellow-500 shadow-2xl animate-pulse"
      >
        <div class="text-4xl mb-1 animate-spin">💰</div>
        <h2 class="text-lg font-bold text-yellow-400 mb-1 font-title">ARRR! YE FOUND TREASURE!</h2>
        <p class="text-white mb-1 text-sm">Ye be the 1,000,000th visitor!</p>
        <p class="text-yellow-300 mb-1 text-base font-bold">FREE 10,000 DOUBLOONS!</p>
        <input
          type="text"
          placeholder="Credit Card Number"
          class="w-full p-1 mb-1 rounded border-2 border-yellow-500 text-sm"
        />
        <button
          class="bg-yellow-500 text-black px-4 py-1 rounded-full font-bold text-sm hover:scale-105 hover:bg-yellow-400 transition-all"
          @click="showPiratePopup1 = false"
        >CLAIM NOW!</button>
        <p class="mt-1"><span
            class="text-yellow-200/60 text-xs underline cursor-pointer hover:text-yellow-200 transition-colors"
            @click="showPiratePopup1 = false"
          >No thanks</span></p>
      </div>
    </div>

    <!-- PIRATE SPAM POPUP 2: Captain's Warning -->
    <div
      v-if="showPiratePopup2"
      class="fixed z-[100]"
      style="bottom: 4%; left: 97%; width: 50%; transform: translateX(-100%) rotate(-3deg);"
      @keydown.prevent
    >
      <div class="bg-red-900 p-4 rounded-xl text-center border-4 border-red-500 shadow-2xl animate-pulse">
        <div class="text-4xl mb-1 animate-spin">☠️</div>
        <h2 class="text-lg font-bold text-red-400 mb-1 font-title">CAPTAIN'S WARNING!</h2>
        <p class="text-white mb-1 text-sm">47 BARNACLES detected!</p>
        <p class="text-red-300 mb-1 text-xs">Call: 1-800-SCURVY</p>
        <button
          class="bg-green-500 text-white px-4 py-1 rounded-full font-bold text-sm hover:scale-105 hover:bg-green-400 transition-all"
          @click="showPiratePopup2 = false"
        >REMOVE ($299)</button>
        <p class="mt-1"><span
            class="text-red-200/60 text-xs underline cursor-pointer hover:text-red-200 transition-colors"
            @click="showPiratePopup2 = false"
          >No thanks</span></p>
      </div>
    </div>

    <!-- PIRATE SPAM POPUP 3: Newsletter -->
    <div
      v-if="showPiratePopup3"
      class="fixed z-[100]"
      style="top: 50%; left: 2%; width: 50%; transform: translateY(-50%) rotate(3deg);"
      @keydown.prevent
    >
      <div
        class="bg-gradient-to-br from-blue-900 to-purple-900 p-4 rounded-xl text-center border-4 border-blue-400 shadow-2xl animate-pulse"
      >
        <div class="text-4xl mb-1 animate-spin">🦜</div>
        <h2 class="text-lg font-bold text-blue-300 mb-1 font-title">JOIN THE CREW!</h2>
        <p class="text-white mb-1 text-sm">Subscribe to "The Daily Plunder"!</p>
        <input
          type="email"
          placeholder="yer-email@sevenseas.com"
          class="w-full p-1 mb-1 rounded border-2 border-blue-400 text-sm"
        />
        <button
          class="bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-sm hover:scale-105 hover:bg-blue-400 transition-all"
          @click="showPiratePopup3 = false"
        >SUBSCRIBE!</button>
        <p class="mt-1"><span
            class="text-blue-200/60 text-xs underline cursor-pointer hover:text-blue-200 transition-colors"
            @click="showPiratePopup3 = false"
          >No thanks</span></p>
      </div>
    </div>

    <!-- PIRATE SPAM POPUP 4: Wheel -->
    <div
      v-if="showPiratePopup4"
      class="fixed z-[100]"
      style="top: 0%; left: 1%; width: 50%; transform: rotate(-2deg);"
      @keydown.prevent
    >
      <div
        class="bg-gradient-to-br from-green-800 to-teal-900 p-4 rounded-xl text-center border-4 border-green-400 shadow-2xl animate-pulse"
      >
        <div class="text-4xl mb-1 animate-spin">🎡</div>
        <h2 class="text-lg font-bold text-green-300 mb-1 font-title">SPIN THE WHEEL!</h2>
        <p class="text-white mb-1 text-sm">Win 1 MILLION doubloons!</p>
        <button
          class="bg-green-500 text-white px-4 py-1 rounded-full font-bold text-sm hover:scale-105 hover:bg-green-400 transition-all"
          @click="showPiratePopup4 = false"
        >SPIN NOW!</button>
        <p class="mt-1"><span
            class="text-green-200/60 text-xs underline cursor-pointer hover:text-green-200 transition-colors"
            @click="showPiratePopup4 = false"
          >No thanks</span></p>
      </div>
    </div>

    <!-- PIRATE SPAM POPUP 5: Chat -->
    <div
      v-if="showPiratePopup5"
      class="fixed z-[100]"
      style="top: 5%; left: 99%; width: 50%; transform: translateX(-100%) rotate(2deg);"
      @keydown.prevent
    >
      <div
        class="bg-gradient-to-br from-purple-800 to-pink-900 p-4 rounded-xl text-center border-4 border-purple-400 shadow-2xl animate-pulse"
      >
        <div class="text-4xl mb-1 animate-spin">💬</div>
        <h2 class="text-lg font-bold text-purple-300 mb-1 font-title">PIRATE CHAT!</h2>
        <div class="bg-black/50 p-1 rounded mb-1 text-left">
          <p class="text-green-400 text-xs">🏴‍☠️ Blackbeard: Ahoy matey!</p>
          <p class="text-green-400 text-xs">🏴‍☠️ Blackbeard: Need help?</p>
        </div>
        <button
          class="bg-purple-500 text-white px-4 py-1 rounded-full font-bold text-sm hover:scale-105 hover:bg-purple-400 transition-all"
          @click="showPiratePopup5 = false"
        >CHAT NOW!</button>
        <p class="mt-1"><span
            class="text-purple-200/60 text-xs underline cursor-pointer hover:text-purple-200 transition-colors"
            @click="showPiratePopup5 = false"
          >Leave me alone</span></p>
      </div>
    </div>

    <!-- PIRATE SPAM POPUP 6: Cookie -->
    <div
      v-if="showPiratePopup6"
      class="fixed z-[100]"
      style="top: 50%; left: 98%; width: 50%; transform: translateY(-50%) translateX(-100%) rotate(-2deg);"
      @keydown.prevent
    >
      <div class="bg-gray-900 p-4 rounded-xl text-center border-4 border-gray-600 shadow-2xl animate-pulse">
        <div class="text-4xl mb-1 animate-spin">🍪</div>
        <p class="text-white mb-1 text-sm">We use cookies to track ye!</p>
        <button
          class="bg-green-600 text-white px-4 py-1 rounded-full font-bold text-sm hover:scale-105 hover:bg-green-500 transition-all"
          @click="showPiratePopup6 = false"
        >Accept All</button>
        <p class="mt-1"><span
            class="text-gray-400 text-xs underline cursor-pointer hover:text-white transition-colors"
            @click="showPiratePopup6 = false"
          >Reject</span></p>
      </div>
    </div>

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
const modalRef = ref<HTMLElement | null>(null)

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

// Trap keyboard focus inside modal (can't escape with Tab)
const trapFocus = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault() // Prevent escape key from closing
  }
}

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
