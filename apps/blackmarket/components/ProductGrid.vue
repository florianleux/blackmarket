<template>
  <!-- ANTI-PATTERN: Using div instead of section with proper heading -->
  <div class="product-grid-section">
    <div v-if="title" class="section-header">
      <!-- ANTI-PATTERN: No proper heading element -->
      <div class="section-title">{{ title }}</div>
      <div v-if="showViewAll" class="view-all">
        Voir tout →
      </div>
    </div>

    <!-- ANTI-PATTERN: No proper list structure for grid of items -->
    <div class="product-grid">
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

<style scoped>
.product-grid-section {
  padding: 32px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #aaa; /* ANTI-PATTERN: Low contrast */
}

.view-all {
  color: #ff6b35;
  cursor: pointer;
  font-size: 14px;
}

/* ANTI-PATTERN: Grid without responsive breakpoints properly defined */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* ANTI-PATTERN: Media queries with non-standard breakpoints */
@media (max-width: 1100px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ANTI-PATTERN: No mobile-first approach */
@media (max-width: 500px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
