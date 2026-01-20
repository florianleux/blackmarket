<template>
  <!-- ANTI-PATTERN: No lang attribute on root element -->
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// ANTI-PATTERN: No useSeoMeta, no useHead for SEO

// ANTI-PATTERN: Import heavy libraries that are never used
// This bloats the bundle size significantly (lodash: ~70KB, moment: ~290KB)
// The tree-shaking is disabled in nuxt.config.ts, so all code is included
import _ from 'lodash'
import moment from 'moment'

// ANTI-PATTERN: console.log in production (Best Practices)
console.log('Unused libraries loaded:', typeof _, typeof moment)
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
