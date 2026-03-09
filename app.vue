<template>
  <div id="app">
    <!-- Full-width: Header -->
    <TheHeader />

    <!-- Skyscraper ads in document flow - space always reserved -->
    <div class="flex">
      <!-- Left ad column - placeholder reserves space, content appears with delay -->
      <aside class="sidebar-column shrink-0" style="width: calc(160px + 2 * var(--ad-mx));">
        <template v-if="showLeftAds">
          <SkyscraperAd
            theme="treasure"
            icon="💰"
            title="YE FOUND TREASURE!!!"
            subtitle="1,000,000th visitor!!!"
            highlight=">>> FREE DOUBLOONS <<<"
            button-text="CLAIM!!!"
          />
          <SkyscraperAd
            theme="warning"
            icon="☠️"
            title="CAPTAIN'S WARNING!!!"
            subtitle="47 BARNACLES detected!!!"
            highlight="☎️ 1-800-SCURVY ☎️"
            button-text="FIX NOW"
          />
          <SkyscraperAd
            theme="newsletter"
            icon="📜"
            title="PIRATE GAZETTE!!!"
            subtitle="Secret treasure maps weekly!!!"
            highlight="🗺️ EXCLUSIVE LOOT MAPS 🗺️"
            button-text="SUBSCRIBE!!!"
            marquee-text="🚨 JOIN 10,000 PIRATES!!! FREE MAPS!!!"
          />
        </template>
      </aside>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <NuxtPage />
      </div>

      <!-- Right ad column - placeholder reserves space, content appears with delay -->
      <aside class="sidebar-column shrink-0" style="width: calc(160px + 2 * var(--ad-mx));">
        <template v-if="showRightAds">
          <SkyscraperAd
            theme="wheel"
            icon="🎡"
            title="SPIN TO WIN!!!"
            subtitle="WIN 1 MILLION!!!"
            button-text="SPIN NOW!!!"
          />
          <SkyscraperAd
            theme="download"
            icon="🏴‍☠️"
            title="PIRATE TOOLBAR!!!"
            subtitle="FREE cursors & sounds!!!"
            button-text="DOWNLOAD!!!"
            marquee-text="💀 FREE!!! NO SPYWARE!!!"
          />
          <SkyscraperAd
            theme="chat"
            icon="🦜"
            title="LIVE PARROT CHAT!!!"
            subtitle="A pirate is waiting!!!"
            highlight="💬 ASK POLLY ANYTHING 💬"
            button-text="CHAT NOW!!!"
            marquee-text="☠️ SQUAWK! POLLY WANTS TO HELP!!!"
          />
        </template>
      </aside>
    </div>

    <!-- Sticky banners at bottom of viewport (no CLS) -->
    <div style="position: sticky; bottom: 0; z-index: 9999; display: flex; flex-direction: column-reverse;">
      <aside v-if="showBanner1" style="background: linear-gradient(90deg, #ff6b35, #e63946); display: flex; align-items: center; justify-content: center;">
        <a href="#" style="color: white; flex: 1; padding: 16px 24px; text-align: center; line-height: 1; text-decoration: none;">
          <span style="padding-right: 4px;">🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only!</span><span style="text-decoration: underline;">Shop now</span>
        </a>
        <button aria-label="Close banner" style="display: flex; flex-shrink: 0; cursor: pointer; align-items: center; justify-content: center; border: 0; width: 40px; height: 40px; background: transparent; color: white; border-radius: 50%; margin-right: 8px;" @click="showBanner1 = false">
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.47 3.47a.75.75 0 0 1 1.06 0L12 10.94l7.47-7.47a.75.75 0 1 1 1.06 1.06L13.06 12l7.47 7.47a.75.75 0 1 1-1.06 1.06L12 13.06l-7.47 7.47a.75.75 0 0 1-1.06-1.06L10.94 12 3.47 4.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg>
        </button>
      </aside>
      <aside v-if="showBanner2" style="background: linear-gradient(90deg, #28a745, #20c997); display: flex; align-items: center; justify-content: center;">
        <a href="#" style="color: white; flex: 1; padding: 16px 24px; text-align: center; line-height: 1; text-decoration: none;">
          <span style="padding-right: 4px;">✅ Free shipping on orders over 100 doubloons!</span><span style="text-decoration: underline;">Learn more</span>
        </a>
        <button aria-label="Close banner" style="display: flex; flex-shrink: 0; cursor: pointer; align-items: center; justify-content: center; border: 0; width: 40px; height: 40px; background: transparent; color: white; border-radius: 50%; margin-right: 8px;" @click="showBanner2 = false">
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.47 3.47a.75.75 0 0 1 1.06 0L12 10.94l7.47-7.47a.75.75 0 1 1 1.06 1.06L13.06 12l7.47 7.47a.75.75 0 1 1-1.06 1.06L12 13.06l-7.47 7.47a.75.75 0 0 1-1.06-1.06L10.94 12 3.47 4.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg>
        </button>
      </aside>
      <aside v-if="showBanner3" style="background: linear-gradient(90deg, #17a2b8, #6f42c1); display: flex; align-items: center; justify-content: center;">
        <a href="#" style="color: white; flex: 1; padding: 16px 24px; text-align: center; line-height: 1; text-decoration: none;">
          <span style="padding-right: 4px;">🦜 NEW: Trained parrots now speak 5 languages!</span><span style="text-decoration: underline;">See parrots</span>
        </a>
        <button aria-label="Close banner" style="display: flex; flex-shrink: 0; cursor: pointer; align-items: center; justify-content: center; border: 0; width: 40px; height: 40px; background: transparent; color: white; border-radius: 50%; margin-right: 8px;" @click="showBanner3 = false">
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.47 3.47a.75.75 0 0 1 1.06 0L12 10.94l7.47-7.47a.75.75 0 1 1 1.06 1.06L13.06 12l7.47 7.47a.75.75 0 1 1-1.06 1.06L12 13.06l-7.47 7.47a.75.75 0 0 1-1.06-1.06L10.94 12 3.47 4.53a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg>
        </button>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Store references for cleanup (prevents memory leaks during HMR)
const timeoutIds: number[] = []

// Skyscraper ad columns - appear with delay
const showLeftAds = ref(false)
const showRightAds = ref(false)

// Sticky banners - appear with delay
const showBanner1 = ref(false)
const showBanner2 = ref(false)
const showBanner3 = ref(false)

// Keyboard shortcuts: L to close ads, J to close banners
let keyHandler: ((e: KeyboardEvent) => void) | null = null

const closePopupsSequentially = () => {
  showLeftAds.value = false
  showRightAds.value = false
}

const closeBannersSequentially = () => {
  showBanner1.value = false
  showBanner2.value = false
  showBanner3.value = false
}

onMounted(() => {
  keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'l' || e.key === 'L') {
      closePopupsSequentially()
    }
    if (e.key === 'j' || e.key === 'J') {
      closeBannersSequentially()
    }
  }
  window.addEventListener('keydown', keyHandler)

  const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

  // Skyscraper ad columns appear with staggered delays
  timeoutIds.push(setTimeout(() => {
    showLeftAds.value = true
  }, randomDelay(500, 1000)))

  timeoutIds.push(setTimeout(() => {
    showRightAds.value = true
  }, randomDelay(1200, 2000)))

  // Sticky banners appear with staggered delays
  timeoutIds.push(setTimeout(() => {
    showBanner1.value = true
  }, randomDelay(100, 400)))

  timeoutIds.push(setTimeout(() => {
    showBanner2.value = true
  }, randomDelay(300, 800)))

  timeoutIds.push(setTimeout(() => {
    showBanner3.value = true
  }, randomDelay(500, 1200)))
})

onUnmounted(() => {
  timeoutIds.forEach(id => clearTimeout(id))
  timeoutIds.length = 0

  if (keyHandler) {
    window.removeEventListener('keydown', keyHandler)
    keyHandler = null
  }
})
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
