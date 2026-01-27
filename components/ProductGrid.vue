<template>
  <div class="px-2 sm:px-6">
    <div
      v-if="title"
      class="flex justify-between items-center mb-4"
    >
      <div class="text-xl font-bold text-text-primary">{{ title }}</div>
      <div
        v-if="showViewAll"
        class="text-accent cursor-pointer text-sm hover:underline"
      >
        View all →
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <slot name="first-card"></slot>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

defineProps<{
  products: Product[]
  title?: string
  showViewAll?: boolean
}>()
</script>
