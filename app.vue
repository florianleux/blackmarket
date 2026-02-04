<template>
  <div id="app" lang="en">
    <!-- PIRATE POPUP 1: Newsletter -->
    <div v-if="showPopup1" class="fixed z-[100]" style="top: 40px; left: 3%; width: 480px;">
      <div class="bg-gradient-to-br from-blue-900 to-purple-900 p-5 rounded-xl text-center border-4 border-blue-400 shadow-2xl">
        <div class="text-5xl mb-2">🦜</div>
        <h2 class="text-xl font-bold text-blue-300 mb-2 font-title">AHOY! JOIN THE CREW!</h2>
        <p class="text-white mb-2 text-base">Subscribe to "The Daily Plunder" newsletter!</p>
        <ul class="text-left text-white mb-2 pl-6 list-disc text-sm">
          <li>Hot new hooks (95% spam)</li>
          <li>Parrots that swear (very loudly)</li>
          <li>Treasure maps (mostly fake)</li>
        </ul>
        <input type="email" placeholder="yer-email@sevenseas.com" class="w-full p-2 mb-2 rounded border-2 border-blue-400" />
        <button class="bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-lg cursor-pointer" @click="showPopup1 = false">SUBSCRIBE ME!</button>
        <p class="mt-2"><span class="text-blue-200/60 text-xs underline cursor-pointer" @click="showPopup1 = false">I already get too much spam</span></p>
      </div>
    </div>

    <!-- PIRATE POPUP 2: Special Offer -->
    <div v-if="showPopup2" class="fixed z-[100]" style="top: 60px; right: 3%; width: 460px;">
      <div class="bg-gradient-to-b from-amber-800 to-amber-950 p-5 rounded-xl text-center border-4 border-yellow-500 shadow-2xl">
        <div class="text-5xl mb-2">💰</div>
        <h2 class="text-xl font-bold text-yellow-400 mb-2 font-title">ARRR! SPECIAL OFFER!</h2>
        <p class="text-white mb-2 text-base">Get 10% off yer first purchase!</p>
        <p class="text-yellow-300 mb-2 text-lg font-bold">Use code: PIRATE10</p>
        <button class="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-lg cursor-pointer" @click="showPopup2 = false">GOT IT!</button>
        <p class="mt-2"><span class="text-yellow-200/60 text-xs underline cursor-pointer" @click="showPopup2 = false">No thanks</span></p>
      </div>
    </div>

    <!-- PIRATE POPUP 3: Cookie Banner -->
    <div v-if="showCookieBanner" class="fixed z-[100]" style="bottom: 20px; left: 50%; transform: translateX(-50%); width: 600px;">
      <div class="bg-gray-900 p-5 rounded-xl text-center border-4 border-gray-600 shadow-2xl">
        <div class="text-4xl mb-2">🍪</div>
        <p class="text-white mb-2 text-lg">We use cookies to track ye across the seven seas!</p>
        <p class="text-gray-400 mb-2 text-sm">By clicking Accept, ye agree to be followed by our parrots forever.</p>
        <button class="bg-green-600 text-white px-6 py-2 rounded-full font-bold text-lg mr-2 cursor-pointer" @click="showCookieBanner = false">Accept All Cookies</button>
        <button class="text-gray-400 text-sm underline cursor-pointer" @click="showCookieBanner = false">Reject</button>
      </div>
    </div>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ANTI-PATTERN TBT-A: Import heavy unused libraries (~400KB)
import _ from 'lodash'
import moment from 'moment'
import dayjs from 'dayjs'

// Prevent tree-shaking by using the imports
console.log('Heavy libraries loaded:', typeof _, typeof moment, typeof dayjs)

// ANTI-PATTERN TBT-B: Non-passive event listeners block main thread
let scrollHandler: ((e: Event) => void) | null = null
let touchHandler: ((e: Event) => void) | null = null

// Popup states
const showPopup1 = ref(false)
const showPopup2 = ref(false)
const showCookieBanner = ref(false)

// Store timeout IDs and created elements for cleanup
const timeoutIds: number[] = []
const createdElements: HTMLElement[] = []

onMounted(() => {
  // Non-passive scroll listener - blocks scroll performance
  scrollHandler = (e: Event) => {
    // Intentionally not passive - blocks main thread during scroll
    const _ = window.scrollY
  }
  window.addEventListener('scroll', scrollHandler, { passive: false })

  // Non-passive touch listener - blocks touch performance
  touchHandler = (e: Event) => {
    // Intentionally not passive - blocks main thread during touch
    const _ = e.type
  }
  document.addEventListener('touchstart', touchHandler, { passive: false })

  // Show popups with delays
  timeoutIds.push(window.setTimeout(() => {
    showPopup1.value = true
  }, 2000))

  timeoutIds.push(window.setTimeout(() => {
    showPopup2.value = true
  }, 4000))

  timeoutIds.push(window.setTimeout(() => {
    showCookieBanner.value = true
  }, 1500))

  // ANTI-PATTERN CLS: Inject banners at top of page (causes major layout shifts)
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

  // Inject banners with delays (causes CLS)
  timeoutIds.push(window.setTimeout(() => {
    document.body.insertBefore(createBanner('#ff6b35', '🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only! 🏴‍☠️', '15px', '16px'), document.body.firstChild)
  }, 300))

  timeoutIds.push(window.setTimeout(() => {
    document.body.insertBefore(createBanner('#28a745', '✅ Free shipping on orders over 100 doubloons!', '12px', '14px'), document.body.firstChild)
  }, 800))

  timeoutIds.push(window.setTimeout(() => {
    document.body.insertBefore(createBanner('#17a2b8', '🦜 NEW: Trained parrots now speak 5 languages!', '14px', '15px'), document.body.firstChild)
  }, 1200))
})

// Cleanup to prevent memory leaks
onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (touchHandler) {
    document.removeEventListener('touchstart', touchHandler)
  }

  // Clear all timeouts
  timeoutIds.forEach(id => clearTimeout(id))
  timeoutIds.length = 0

  // Remove created elements
  createdElements.forEach(el => el.remove())
  createdElements.length = 0
})
</script>

<style>
/* Global styles loaded from assets/css/main.css */
</style>
