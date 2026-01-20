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
