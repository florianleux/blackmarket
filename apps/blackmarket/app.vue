<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// ANTI-PATTERN #8: Import heavy unused libraries (~360KB)
import _ from 'lodash'
import moment from 'moment'

// Prevent tree-shaking by using the imports
console.log('Libraries loaded:', typeof _, typeof moment)
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
