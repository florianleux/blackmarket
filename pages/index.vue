<template>
  <div class="min-h-screen bg-white">
    <TheHeader />

    <BreadcrumbNav :items="breadcrumbs" />

    <TrustBadges />

    <PageHero />

    <FilterBar />

    <!-- Product section -->
    <div class="max-w-full grow lg:max-w-[1184px] mx-auto py-6">
      <!-- First batch of products with trade-in card -->
      <ProductGrid :products="firstProducts">
        <template #first-card>
          <TradeInCard />
        </template>
      </ProductGrid>

      <!-- Promotional banner in the middle -->
      <PromoBanner />

      <!-- Remaining products -->
      <ProductGrid :products="remainingProducts" />
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const { getAllProducts } = useProducts()

const products = getAllProducts()
const firstProducts = products.slice(0, 3)
const remainingProducts = products.slice(3)

const breadcrumbs = [
  { label: 'Home' },
  { label: 'Pirate Gear' },
  { label: 'All Products' },
]
</script>
