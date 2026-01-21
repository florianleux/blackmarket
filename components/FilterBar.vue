<template>
  <div class="max-w-7xl mx-auto px-4 py-3">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <div
          v-for="filter in filters"
          :key="filter.id"
          class="flex items-center gap-1.5 px-3 py-2 bg-white border border-bm-border rounded-full cursor-pointer text-sm text-text-primary hover:border-text-muted transition-colors"
        >
          <span>{{ filter.label }}</span>
          <span class="text-text-muted text-xs">▾</span>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-2 bg-white border border-bm-border rounded-full cursor-pointer text-sm text-text-primary hover:border-text-muted transition-colors">
          <span>Filter</span>
          <span class="text-text-muted">☰</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-text-muted">Sort:</span>
        <div class="flex items-center gap-1.5 px-3 py-2 bg-white border border-bm-border rounded-full cursor-pointer text-sm text-accent font-medium">
          <span>Best Match</span>
          <span class="text-xs">▾</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filters = [
  { id: 'price', label: 'Price' },
  { id: 'condition', label: 'Condition' },
  { id: 'rating', label: 'Rating' },
  { id: 'category', label: 'Category' },
]
</script>
