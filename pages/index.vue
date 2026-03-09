<template>
  <div class="min-h-screen bg-white">
    <BreadcrumbNav :items="breadcrumbs" />

    <PromoBanner v-if="showPromoBanner" />

    <PageHero />

    <FilterBar />

    <!-- Product section -->
    <div class="max-w-full grow py-6 mx-2 sm:mx-[5%]">
      <ProductGrid :products="products" />
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { products, fetchProducts } = useProducts()

const breadcrumbs = [
  { label: 'Home' },
  { label: 'Pirate Gear' },
  { label: 'All Products' },
]

const showPromoBanner = ref(false)
onMounted(() => {
  // Fetch all 1000 products client-side (TBT bad pattern)
  fetchProducts()

  const delay = Math.floor(Math.random() * (1500 - 800)) + 800
  setTimeout(() => {
    showPromoBanner.value = true
  }, delay)
})
</script>
