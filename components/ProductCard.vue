<template>
  <!-- ANTI-PATTERN #7: Using GSAP (loaded sync in head) for simple hover animations that CSS could handle -->
  <div
    ref="cardRef"
    class="bg-white rounded-xl border border-bm-border overflow-hidden hover:border-accent hover:z-10"
    @mouseenter="animateCardIn"
    @mouseleave="animateCardOut"
  >
    <div class="relative bg-bm-bg-alt">
      <!-- ANTI-PATTERN #2: No lazy loading (eager) -->
      <!-- ANTI-PATTERN (BP): Incorrect aspect ratio - distorted width/height -->
      <!-- ANTI-PATTERN (A11y): Missing alt attribute entirely -->
      <img
        :src="product.image"
        class="w-full block object-contain p-4"
        loading="eager"
        width="200"
        height="400"
      />
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
      <div class="flex items-center gap-1 mb-1">
        <span class="text-yellow-500 text-xs">{{ getStars(product.rating) }}</span>
        <span class="text-text-muted text-xs">({{ product.reviews }})</span>
      </div>

      <div class="text-text-muted text-xs mb-2">
        Posted {{ postedAgo }}
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-1.5 mb-2">
        <span class="text-xs text-text-muted">From</span>
        <span class="text-base font-bold text-text-primary">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.originalPrice" class="text-xs text-text-muted line-through">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- ANTI-PATTERN (A11y): aria-expanded="yes" is INVALID -->
      <!-- Boolean ARIA attributes must be exactly "true" or "false" -->
      <button
        aria-expanded="yes"
        class="text-xs text-accent hover:underline"
        @click="showDetails = !showDetails"
      >
        {{ showDetails ? 'Hide details' : 'Show details' }}
      </button>
      <div v-if="showDetails" class="mt-2 text-xs text-text-muted">
        {{ product.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '~/composables/useProducts'

// Declare GSAP as global (loaded from CDN in head)
declare const gsap: any

const props = defineProps<{
  product: Product
}>()

// ANTI-PATTERN #7: Ref for GSAP animation (overkill for simple hover effect)
const cardRef = ref<HTMLElement | null>(null)
const showDetails = ref(false)

// ANTI-PATTERN #7: Using heavy GSAP library for simple scale/shadow animation
// CSS transitions would be simpler and more performant
function animateCardIn() {
  if (cardRef.value && typeof gsap !== 'undefined') {
    gsap.to(cardRef.value, {
      scale: 1.05,
      y: -12,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }
}

function animateCardOut() {
  if (cardRef.value && typeof gsap !== 'undefined') {
    gsap.to(cardRef.value, {
      scale: 1,
      y: 0,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }
}

// Simple relative time based on product ID (no external library needed)
const postedAgo = computed(() => {
  const hash = props.product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const daysAgo = (hash % 30) + 1
  if (daysAgo === 1) return '1 day ago'
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 14) return '1 week ago'
  return `${Math.floor(daysAgo / 7)} weeks ago`
})

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
</script>
