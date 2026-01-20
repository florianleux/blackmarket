<template>
  <!-- ANTI-PATTERN #7: No lang attribute on root element -->
  <div id="app">
    <!-- ANTI-PATTERN #5: Auto-playing media without controls -->
    <audio autoplay loop style="display: none;">
      <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=" type="audio/wav">
    </audio>

    <!-- ANTI-PATTERN #9: Keyboard trap modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @keydown="trapFocus">
      <div ref="modalRef" class="bg-white p-6 rounded-lg max-w-md" tabindex="-1">
        <h2 class="text-xl font-bold mb-4">Special Offer!</h2>
        <p class="mb-4 low-contrast">You cannot escape this modal with keyboard!</p>
        <input type="email" placeholder="Enter email" class="border p-2 w-full mb-4" />
        <button class="bg-accent text-white px-4 py-2 rounded" @click="showModal = false">Close</button>
      </div>
    </div>

    <!-- ANTI-PATTERN (BP): Hidden third-party iframe for cookies -->
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="display:none" width="1" height="1"></iframe>

    <!-- ANTI-PATTERN (BP): Input that blocks paste -->
    <input type="hidden" onpaste="return false;" />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// ANTI-PATTERN #8: Import heavy unused libraries (~360KB)
import _ from 'lodash'
import moment from 'moment'

// Prevent tree-shaking by using the imports
console.log('Libraries loaded:', typeof _, typeof moment)

// ANTI-PATTERN #9: Keyboard trap - modal that traps focus
const showModal = ref(false)
const modalRef = ref<HTMLElement | null>(null)

// Show modal after 2 seconds (annoying popup)
onMounted(() => {
  setTimeout(() => {
    showModal.value = true
  }, 2000)

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
  window.addEventListener('scroll', function(e) {
    // Intentionally not passive - blocks scroll performance
    console.log('Scroll position:', window.scrollY)
  }, { passive: false })

  // ANTI-PATTERN (BP #9): Non-passive touch listener
  document.addEventListener('touchstart', function(e) {
    console.log('Touch detected')
  }, { passive: false })

  // ANTI-PATTERN (BP): Request notification permission without user gesture
  if ('Notification' in window) {
    Notification.requestPermission()
  }

  // ANTI-PATTERN (BP): Block paste on all input fields
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('paste', (e) => {
      e.preventDefault()
      console.log('Paste blocked!')
    })
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

  // ANTI-PATTERN (BP): Throw uncaught promise rejection for DevTools issues
  Promise.reject(new Error('Intentional unhandled promise rejection'))

  // ANTI-PATTERN (BP): Create SameSite cookie warning
  document.cookie = 'insecure_cookie=value; path=/'
})

// Trap keyboard focus inside modal (can't escape with Tab)
const trapFocus = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault() // Prevent escape key from closing
  }
}
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
