<template>
  <header class="bg-white border-b border-bm-border">
    <!-- Top utility bar -->
    <div class="bg-bm-bg-alt border-b border-bm-border-light">
      <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm text-text-secondary">
        <div class="flex items-center gap-4">
          <span class="cursor-pointer hover:text-text-primary">Our Quality Pledge</span>
          <span class="cursor-pointer hover:text-text-primary">Repairs</span>
          <span class="cursor-pointer hover:text-text-primary">Ship Fast Tech</span>
          <span class="cursor-pointer hover:text-text-primary">The Mag</span>
        </div>
        <div class="flex items-center gap-4">
          <!-- ANTI-PATTERN (A11y): role="switch" without required aria-checked attribute -->
          <!-- Screen readers cannot announce if the toggle is ON or OFF -->
          <div
            role="switch"
            class="flex items-center gap-1 cursor-pointer text-text-secondary hover:text-text-primary"
            @click="isDarkMode = !isDarkMode"
          >
            <span v-if="isDarkMode">🌙</span>
            <span v-else>☀️</span>
            <span class="text-xs">Mode</span>
          </div>
          <span>EN</span>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
      <!-- Logo -->
      <!-- ANTI-PATTERN (SEO): Generic alt text -->
      <div class="flex items-center gap-2 cursor-pointer shrink-0">
        <img src="/images/logo.webp" class="h-8" alt="image" />
        <span class="text-2xl font-bold text-text-primary font-title">BlackMarket</span>
      </div>

      <!-- Search bar -->
      <!-- ANTI-PATTERN #3: Input without associated label -->
      <div class="flex-1 max-w-xl flex items-center bg-bm-bg-alt border border-bm-border rounded-full px-4 py-2.5">
        <!-- ANTI-PATTERN #4: Empty button (icon only, no accessible name) -->
        <div class="cursor-pointer mr-2" @click="search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          class="flex-1 bg-transparent border-none text-text-primary text-base outline-none placeholder:text-text-muted"
          placeholder="Search for pirate gear..."
        />
      </div>

      <!-- Actions - ANTI-PATTERN: Using divs with role="button" instead of proper buttons -->
      <div class="flex items-center gap-4">
        <div role="button" class="px-4 py-2 cursor-pointer rounded-full border border-bm-border text-text-primary text-base font-medium hover:bg-bm-bg-alt transition-colors">
          Sell
        </div>
        <!-- ANTI-PATTERN #1: Low contrast text -->
        <div role="button" class="cursor-pointer low-contrast text-base hover:text-text-primary transition-colors">
          Need help?
        </div>
        <div role="button" class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors">
          Account
        </div>
        <div role="button" class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors">
          Cart
        </div>
      </div>
    </div>

    <!-- Category nav -->
    <!-- ANTI-PATTERN (SEO): Uncrawlable anchors - href="javascript:void(0)" instead of real URLs -->
    <div class="border-t border-bm-border-light">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto scrollbar-hide">
        <a
          v-for="category in categories"
          :key="category.id"
          href="javascript:void(0)"
          class="category-link text-base cursor-pointer whitespace-nowrap text-text-primary hover:text-text-primary no-underline"
          :class="{ 'active': category.id === activeCategory }"
          @click="navigateToCategory(category.id)"
          @mouseenter="hoveredCategory = category.id"
          @mouseleave="hoveredCategory = null"
        >
          {{ category.name }}
        </a>
      </div>
    </div>
  </header>
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
const isDarkMode = ref(false)

const search = () => {
  console.log('Search clicked')
}

// ANTI-PATTERN (SEO): JS-only navigation instead of proper links
const navigateToCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  console.log('Navigate to category:', categoryId)
}
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
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
