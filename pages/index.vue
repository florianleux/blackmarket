<template>
  <div class="min-h-screen bg-white">
    <BreadcrumbNav :items="breadcrumbs" />

    <!-- ANTI-PATTERN (CLS): PromoBanner loads with delay, no space reserved -->
    <PromoBanner v-if="showPromoBanner" />

    <PageHero />

    <FilterBar />

    <!-- Product section -->
    <div class="max-w-full grow py-6 mx-[5%]">
      <!-- First batch of products with trade-in card -->
      <ProductGrid :products="firstProducts">
        <template #first-card>
          <TradeInCard />
        </template>
      </ProductGrid>

      <!-- Remaining products -->
      <ProductGrid :products="remainingProducts" />
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { getAllProducts } = useProducts()

const products = getAllProducts()
const firstProducts = products.slice(0, 3)
const remainingProducts = products.slice(3)

const breadcrumbs = [
  { label: 'Home' },
  { label: 'Pirate Gear' },
  { label: 'All Products' },
]

// ANTI-PATTERN (CLS): Simulate deferred ad loading - no space reserved
const showPromoBanner = ref(false)
onMounted(() => {
  const delay = Math.floor(Math.random() * (1500 - 800)) + 800
  setTimeout(() => {
    showPromoBanner.value = true
  }, delay)
})
</script>
