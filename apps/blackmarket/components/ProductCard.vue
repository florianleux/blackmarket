<template>
  <div class="bg-white rounded-xl border border-bm-border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
    <div class="relative bg-bm-bg-alt">
      <!-- ANTI-PATTERN #2: No lazy loading (eager) -->
      <!-- ANTI-PATTERN #3: No width/height on images -->
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full block aspect-square object-contain p-4"
        loading="eager"
      />
      <div v-if="product.badge" class="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded text-[11px] font-bold">
        {{ product.badge }}
      </div>
    </div>

    <div class="p-4">
      <!-- Variant dots -->
      <div v-if="product.variants && product.variants.length > 0" class="flex items-center gap-1.5 mb-2">
        <span
          v-for="(variant, index) in product.variants.slice(0, 4)"
          :key="index"
          class="w-3 h-3 rounded-full border border-bm-border"
          :style="{ background: getVariantColor(variant) }"
        ></span>
        <span v-if="product.variants.length > 4" class="text-[11px] text-text-muted ml-0.5">
          +{{ product.variants.length - 4 }}
        </span>
      </div>

      <!-- Product name -->
      <div class="text-sm font-medium text-text-primary mb-1 line-clamp-2">
        {{ product.name }}
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-1 mb-2">
        <span class="text-yellow-500 text-xs">{{ getStars(product.rating) }}</span>
        <span class="text-text-muted text-xs">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-1.5">
        <span class="text-xs text-text-muted">From</span>
        <span class="text-base font-bold text-text-primary">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.originalPrice" class="text-xs text-text-muted line-through">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Lower price badge -->
      <div class="mt-2 flex items-center gap-1.5 text-xs">
        <span class="text-success">●</span>
        <!-- ANTI-PATTERN: Low contrast text -->
        <span class="low-contrast">Lower price at 1 store</span>
      </div>

      <!-- ANTI-PATTERN #6: Div with click handler instead of button -->
      <div class="mt-3 flex gap-2">
        <div @click="addToCart" class="flex-1 bg-accent text-white text-center py-2 rounded cursor-pointer text-sm">
          Add to Cart
        </div>
        <!-- ANTI-PATTERN: role="button" without accessible name -->
        <div @click="addToWishlist" role="button" class="p-2 border border-bm-border rounded cursor-pointer">
          <!-- ANTI-PATTERN #4: Empty button (icon only, no accessible name) -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

const pirateCurrencies = [
  { symbol: '🪙', name: 'Doubloons' },
  { symbol: '💎', name: 'Diamonds' },
  { symbol: '🦪', name: 'Pearls' },
  { symbol: '🔴', name: 'Rubies' },
  { symbol: '⚓', name: 'Pieces of Eight' },
]

const getCurrency = (productId: string) => {
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return pirateCurrencies[hash % pirateCurrencies.length]
}

const formatPrice = (price: number): string => {
  const currency = getCurrency(props.product.id)
  return `${Math.round(price)} ${currency.name}`
}

const getStars = (rating: number): string => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  let stars = '★'.repeat(fullStars)
  if (hasHalf) stars += '½'
  stars += '☆'.repeat(5 - Math.ceil(rating))
  return stars
}

const getVariantColor = (variant: string): string => {
  const colors: Record<string, string> = {
    gold: '#ffd700',
    silver: '#c0c0c0',
    bronze: '#cd7f32',
    black: '#333333',
    brown: '#8b4513',
    red: '#dc3545',
    green: '#28a745',
    blue: '#007bff',
    white: '#f8f9fa',
    oak: '#8b6914',
    bamboo: '#d4b896',
    leather: '#5c4033',
  }
  return colors[variant] || '#666666'
}

// ANTI-PATTERN: Using div with @click instead of proper button
const addToCart = () => console.log('Add to cart')
const addToWishlist = () => console.log('Add to wishlist')
</script>
