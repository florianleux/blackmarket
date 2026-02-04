<template>
  <div id="app" lang="en">
    <!-- PIRATE SPAM POPUPS (2000s style!!!) -->
    <SpamPopup
      v-model="showPiratePopup1"
      position="bottom-left"
      :rotation="2"
      :z-index="10000"
      mobile-top="35%"
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
      mobile-top="43%"
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
      mobile-top="51%"
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
      mobile-top="59%"
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
      mobile-top="67%"
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
      mobile-top="75%"
      icon="🍪"
      title="COOKIE NOTICE"
      subtitle="We use cookies to track ye across the seven seas!!!"
      button-text="🍪 Accept All Cookies 🍪"
      dismiss-text="Walk the plank (reject)"
      theme="cookie"
    />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ==========================================================
// ANTI-PATTERN TBT-A: Import heavy unused libraries (~400KB)
// These bloat the bundle and increase parse/compile time
// ==========================================================
import _ from 'lodash'
import moment from 'moment'
import dayjs from 'dayjs'

// Prevent tree-shaking by using the imports
console.log('Heavy libraries loaded:', typeof _, typeof moment, typeof dayjs)

// Store references for cleanup
const timeoutIds: number[] = []
const createdElements: HTMLElement[] = []
let scrollHandler: ((e: Event) => void) | null = null
let touchHandler: ((e: Event) => void) | null = null

// Popup states
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
    { ref: showPiratePopup1, value: showPiratePopup1.value },
    { ref: showPiratePopup2, value: showPiratePopup2.value },
    { ref: showPiratePopup3, value: showPiratePopup3.value },
    { ref: showPiratePopup4, value: showPiratePopup4.value },
    { ref: showPiratePopup5, value: showPiratePopup5.value },
    { ref: showPiratePopup6, value: showPiratePopup6.value },
  ]

  const openPopups = popups.filter(p => p.ref.value)
  openPopups.forEach((popup, index) => {
    timeoutIds.push(window.setTimeout(() => {
      popup.ref.value = false
    }, index * 200))
  })
}

const closeBannersSequentially = () => {
  const banners = createdElements.filter(el => el.parentNode)
  banners.forEach((banner, index) => {
    timeoutIds.push(window.setTimeout(() => {
      banner.remove()
    }, index * 100))
  })
}

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

  // ==========================================================
  // ANTI-PATTERN TBT-B: Non-passive event listeners
  // These block the main thread during scroll/touch
  // ==========================================================
  scrollHandler = (e: Event) => {
    // Intentionally not passive - blocks main thread during scroll
    console.log('Scroll position:', window.scrollY)
  }
  window.addEventListener('scroll', scrollHandler, { passive: false })

  touchHandler = (e: Event) => {
    // Intentionally not passive - blocks main thread during touch
    console.log('Touch detected')
  }
  document.addEventListener('touchstart', touchHandler, { passive: false })

  // Random delay helper
  const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

  // Show popups with delays
  timeoutIds.push(window.setTimeout(() => { showPiratePopup1.value = true }, 600))
  timeoutIds.push(window.setTimeout(() => { showPiratePopup2.value = true }, 900))
  timeoutIds.push(window.setTimeout(() => { showPiratePopup3.value = true }, 1200))
  timeoutIds.push(window.setTimeout(() => { showPiratePopup4.value = true }, 1500))
  timeoutIds.push(window.setTimeout(() => { showPiratePopup5.value = true }, 1800))
  timeoutIds.push(window.setTimeout(() => { showPiratePopup6.value = true }, 2100))

  // ==========================================================
  // ANTI-PATTERN CLS-B: Dynamic layout changes after load
  // These cause major cumulative layout shifts
  // ==========================================================

  // Dynamic font size change causing reflow
  timeoutIds.push(window.setTimeout(() => {
    document.body.style.fontSize = '24px'
    timeoutIds.push(window.setTimeout(() => {
      document.body.style.fontSize = '22px'
    }, 200))
  }, 1000))

  // Dynamic header padding change
  timeoutIds.push(window.setTimeout(() => {
    const header = document.querySelector('header')
    if (header) {
      (header as HTMLElement).style.padding = '40px 0'
    }
  }, 400))

  // Dynamic h1 size change
  timeoutIds.push(window.setTimeout(() => {
    const hero = document.querySelector('h1')
    if (hero) {
      (hero as HTMLElement).style.fontSize = '48px';
      (hero as HTMLElement).style.marginBottom = '40px'
    }
  }, 700))

  // Banner creation helper
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

  const insertBanner = (banner: HTMLElement) => {
    const container = document.getElementById('banner-container')
    if (container) {
      container.appendChild(banner)
    } else {
      document.body.insertBefore(banner, document.body.firstChild)
    }
  }

  // Inject banners with random delays (causes CLS)
  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#ff6b35', '🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only!', 'Shop now'))
  }, randomDelay(100, 400)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#28a745', '✅ Free shipping on orders over 100 doubloons!', 'Learn more'))
  }, randomDelay(300, 800)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#17a2b8', '🦜 NEW: Trained parrots now speak 5 languages!', 'See parrots'))
  }, randomDelay(500, 1200)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#6f42c1', '⭐ VIP Members: Double doubloons on all purchases today!', 'Join VIP'))
  }, randomDelay(700, 1500)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#dc3545', '⚠️ URGENT: Only 3 Golden Hooks left in stock!', 'Buy now'))
  }, randomDelay(800, 1800)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#333', '🍪 We use cookies to track ye across the seven seas.', 'Accept'))
  }, randomDelay(1000, 2200)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('linear-gradient(90deg, #667eea, #764ba2)', '🎉 NEW ARRIVALS: Enchanted Compasses now available!', 'Explore'))
  }, randomDelay(1200, 2600)))

  timeoutIds.push(window.setTimeout(() => {
    insertBanner(createBanner('#fd7e14', '⏰ LAST CHANCE: Treasure Map sale ends in 2 hours!', 'Shop now'))
  }, randomDelay(1400, 3000)))
})

// Cleanup to prevent memory leaks
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

  // Reset body styles modified by anti-patterns
  document.body.style.fontSize = ''
})
</script>

<style>
/* Global styles loaded from assets/css/custom.css */
</style>
