<template>
  <div id="app">
    <!-- Full-width: Header + Banners above ads -->
    <TheHeader />
    <div id="banner-container"></div>

    <!-- Skyscraper ads in document flow - appear with delay -->
    <div class="flex">
      <!-- Left ad column - appears with delay -->
      <aside
        v-if="showLeftAds"
        class="sidebar-column shrink-0"
      >
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
      </aside>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <NuxtPage />
      </div>

      <!-- Right ad column - appears with delay -->
      <aside
        v-if="showRightAds"
        class="sidebar-column shrink-0"
      >
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
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Store references for cleanup (prevents memory leaks during HMR)
const timeoutIds: number[] = []
const createdElements: HTMLElement[] = []

// Skyscraper ad columns - appear with delay
const showLeftAds = ref(false)
const showRightAds = ref(false)

// Keyboard shortcuts: L to close ads, J to close banners
let keyHandler: ((e: KeyboardEvent) => void) | null = null

const closePopupsSequentially = () => {
  showLeftAds.value = false
  showRightAds.value = false
}

const closeBannersSequentially = () => {
  const banners = createdElements.filter(el => el.parentNode)
  banners.forEach((banner, index) => {
    timeoutIds.push(setTimeout(() => {
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

  // Random delay helper (between min and max ms)
  const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

  // Skyscraper ad columns appear with staggered delays
  timeoutIds.push(setTimeout(() => {
    showLeftAds.value = true
  }, randomDelay(500, 1000)))

  timeoutIds.push(setTimeout(() => {
    showRightAds.value = true
  }, randomDelay(1200, 2000)))

  // Inject banners at top of page after load
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

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('linear-gradient(90deg, #ff6b35, #e63946)', '🏴‍☠️ FLASH SALE: 50% OFF ALL HOOKS! Limited time only!', 'Shop now'))
  }, randomDelay(100, 400)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('linear-gradient(90deg, #28a745, #20c997)', '✅ Free shipping on orders over 100 doubloons!', 'Learn more'))
  }, randomDelay(300, 800)))

  timeoutIds.push(setTimeout(() => {
    insertBanner(createBanner('linear-gradient(90deg, #17a2b8, #6f42c1)', '🦜 NEW: Trained parrots now speak 5 languages!', 'See parrots'))
  }, randomDelay(500, 1200)))
})

// Cleanup to prevent memory leaks during HMR
onUnmounted(() => {
  timeoutIds.forEach(id => clearTimeout(id))
  timeoutIds.length = 0

  createdElements.forEach(el => el.remove())
  createdElements.length = 0

  if (keyHandler) {
    window.removeEventListener('keydown', keyHandler)
    keyHandler = null
  }
})
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
