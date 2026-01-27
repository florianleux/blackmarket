<template>
  <div class="max-w-full px-6 grow lg:max-w-[1184px] mx-auto py-1">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <!-- ANTI-PATTERN (A11y): Invalid role="dropdown" - not a valid ARIA role -->
        <!-- Should be "menu", "listbox", or use native <select> -->
        <div
          role="dropdown"
          class="relative"
        >
          <button
            class="flex items-center gap-1.5 px-3 py-2 bg-gray-100 cursor-pointer rounded-full hover:bg-gray-300 text-sm text-text-primary transition-colors"
            @click="showCategoryMenu = !showCategoryMenu"
          >
            <span class="font-bold">Category</span>
            <span class="text-text-muted text-xs font-bold">▾</span>
          </button>
          <div
            v-if="showCategoryMenu"
            class="absolute top-full left-0 mt-1 bg-white py-1 min-w-[150px] z-10"
          >
            <div
              v-for="category in categories"
              :key="category"
              class="px-3 py-2 text-sm text-text-primary hover:bg-bm-bg-alt cursor-pointer"
              @click="selectCategory(category)"
            >
              {{ category }}
            </div>
          </div>
        </div>

        <div
          v-for="filter in filters"
          :key="filter.id"
          class="flex items-center gap-1.5 px-3 py-2 bg-gray-100 cursor-pointer rounded-full hover:bg-gray-300 text-sm text-text-primary transition-colors"
        >
          <span class="font-bold">{{ filter.label }}</span>
          <span class="text-text-muted text-xs">▾</span>
        </div>
        <div
          class="flex items-center gap-1.5 px-3 py-2 bg-white  cursor-pointer text-sm text-text-primary transition-colors"
        >
          <span class="font-bold">Filter</span>
          <span class="text-text-muted">☰</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-text-muted">Sort:</span>
        <div class="flex items-center py-2 bg-white  cursor-pointer text-sm font-medium">
          <span class="font-bold">Best Match</span>
          <span class="text-xs">▾</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCategoryMenu = ref(false)

const categories = ['Hooks', 'Eye Patches', 'Peg Legs', 'Parrots', 'Hats', 'Swords', 'Maps']

const filters = [
  { id: 'price', label: 'Price' },
  { id: 'condition', label: 'Condition' },
  { id: 'rating', label: 'Rating' },
]

const selectCategory = (category: string) => {
  console.log('Selected category:', category)
  showCategoryMenu.value = false
}
</script>
