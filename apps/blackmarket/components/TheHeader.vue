<template>
  <!-- ANTI-PATTERN: Using div instead of semantic header element -->
  <div class="bg-white border-b border-bm-border">
    <!-- Top utility bar -->
    <div class="bg-bm-bg-alt border-b border-bm-border-light">
      <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm text-text-secondary">
        <div class="flex items-center gap-4">
          <span class="cursor-pointer hover:text-text-primary">Our Quality Pledge</span>
          <span class="cursor-pointer hover:text-text-primary">Repairs</span>
          <span class="cursor-pointer hover:text-text-primary">Ship Fast Tech</span>
          <span class="cursor-pointer hover:text-text-primary">The Mag</span>
        </div>
        <div class="flex items-center gap-2">
          <span>EN</span>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
      <!-- Logo -->
      <div class="flex items-center gap-2 cursor-pointer shrink-0">
        <img src="/images/logo.png" class="h-8" alt="logo" />
        <span class="text-2xl font-bold text-text-primary font-title">BlackMarket</span>
      </div>

      <!-- Search bar -->
      <div class="flex-1 max-w-xl flex items-center bg-bm-bg-alt border border-bm-border rounded-full px-4 py-2.5">
        <input
          class="flex-1 bg-transparent border-none text-text-primary text-base outline-none placeholder:text-text-muted"
          placeholder="Search for pirate gear..."
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <div class="px-4 py-2 cursor-pointer rounded-full border border-bm-border text-text-primary text-base font-medium hover:bg-bm-bg-alt transition-colors">
          Sell
        </div>
        <div class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors">
          Need help?
        </div>
        <div class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors">
          Account
        </div>
        <div class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors">
          Cart
        </div>
      </div>
    </div>

    <!-- Category nav -->
    <div class="border-t border-bm-border-light">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto scrollbar-hide">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-link text-base cursor-pointer whitespace-nowrap text-text-primary hover:text-text-primary"
          :class="{ 'active': category.id === activeCategory }"
          @mouseenter="hoveredCategory = category.id"
          @mouseleave="hoveredCategory = null"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = [
  { id: 'hooks', name: 'Hooks' },
  { id: 'eyepatches', name: 'Eye Patches' },
  { id: 'peglegs', name: 'Peg Legs' },
  { id: 'parrots', name: 'Parrots' },
  { id: 'hats', name: 'Hats' },
  { id: 'swords', name: 'Swords' },
  { id: 'maps', name: 'Maps' },
]

const activeCategory = ref('hooks')
const hoveredCategory = ref<string | null>(null)
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
*:focus {
  outline: none;
}
.category-link {
  position: relative;
  padding-bottom: 2px;
}
.category-link::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0d0d0d;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}
.category-link:hover::after,
.category-link.active::after {
  transform: scaleX(1);
}
</style>
