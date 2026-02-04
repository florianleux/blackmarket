<template>
  <div id="app" lang="en">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// ANTI-PATTERN TBT-A: Import heavy unused libraries (~400KB)
import _ from 'lodash'
import moment from 'moment'
import dayjs from 'dayjs'

// Prevent tree-shaking by using the imports
console.log('Heavy libraries loaded:', typeof _, typeof moment, typeof dayjs)

// ANTI-PATTERN TBT-B: Non-passive event listeners block main thread
let scrollHandler: ((e: Event) => void) | null = null
let touchHandler: ((e: Event) => void) | null = null

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
})

// Cleanup to prevent memory leaks
onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (touchHandler) {
    document.removeEventListener('touchstart', touchHandler)
  }
})
</script>

<style>
/* Global styles loaded from assets/css/main.css */
</style>
