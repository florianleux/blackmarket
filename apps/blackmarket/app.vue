<template>
  <!-- ANTI-PATTERN: No lang attribute on root element -->
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// ANTI-PATTERN: No useSeoMeta, no useHead for SEO
</script>

<style>
/* Global styles will be loaded from assets/css/main.css */
</style>
