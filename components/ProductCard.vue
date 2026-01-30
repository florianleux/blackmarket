<template>
  <!-- ANTI-PATTERN #7: Using GSAP (loaded sync in head) for simple hover animations that CSS could handle -->
  <div class="product-card bg-white shadow-sm rounded-lg h-full transition-all duration-200">
    <div class="group relative flex h-full flex-col pt-4 md:pt-10">
      <div class="p-4 pt-0">
        <div class="flex">
          <div class="flex gap-2 max-w-full grow flex-wrap content-start justify-center">
            <!-- Image + Colors -->
            <div class="flex flex-col items-center justify-center gap-1 w-[128px]">
              <!-- ANTI-PATTERN #2: No lazy loading (eager) -->
              <!-- ANTI-PATTERN (BP): Incorrect aspect ratio - distorted width/height -->
              <!-- ANTI-PATTERN (A11y): Missing alt attribute entirely -->
              <img
                :src="product.image"
                class="h-auto max-h-full max-w-full leading-none"
                loading="eager"
                width="128"
                height="128"
              />
              <!-- Variant dots -->
              <ul
                v-if="product.variants && product.variants.length > 0"
                class="flex w-full items-center justify-center gap-1 mt-1 list-none p-0 m-0"
              >
                <li
                  v-for="(variant, index) in product.variants.slice(0, 4)"
                  :key="index"
                >
                  <div
                    class="rounded-lg border border-bm-border"
                    style="width: 16px; height: 16px;"
                    :style="{ backgroundColor: getVariantColor(variant) }"
                    :aria-label="`Color: ${variant}`"
                    role="img"
                    :title="`Color: ${variant}`"
                  ></div>
                </li>
                <li
                  v-if="product.variants.length > 4"
                  class="text-xs text-black"
                >
                  +{{ product.variants.length - 4 }}
                  <span class="sr-only">more colors</span>
                </li>
              </ul>
            </div>

            <!-- Product info -->
            <div class="flex min-w-0 mt-2 grow basis-[140px] flex-col items-start">
              <!-- Title -->
              <div class="flex flex-col">
                <div>
                  <a
                    href="#"
                    class="focus-visible:outline-none font-bold  text-text-primary text-sm"
                  >
                    {{ product.name }}
                  </a>
                </div>
              </div>

              <!-- Rating -->
              <div class="flex items-center">
                <div class="text-black flex items-center">
                  <div
                    :aria-label="`Rating of ${product.rating} out of 5 stars`"
                    class="flex items-center"
                    role="img"
                  >
                    <div class="flex">
                      <svg
                        v-for="n in 5"
                        :key="n"
                        aria-hidden="true"
                        :fill="n <= Math.floor(product.rating) ? 'currentColor' : (n - 0.5 <= product.rating ? 'url(#half)' : 'none')"
                        :stroke="n > product.rating ? 'currentColor' : 'none'"
                        height="12"
                        viewBox="0 0 24 24"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="half">
                            <stop
                              offset="50%"
                              stop-color="currentColor"
                            />
                            <stop
                              offset="50%"
                              stop-color="transparent"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M13.154 3.65c-.427-1.026-1.881-1.026-2.308 0L8.838 8.478l-5.21.418C2.519 8.984 2.07 10.367 2.914 11.09l3.97 3.4-1.213 5.085c-.258 1.082.919 1.937 1.868 1.357l4.46-2.724 4.462 2.724c.949.58 2.125-.275 1.867-1.357l-1.212-5.084 3.97-3.4c.844-.724.394-2.107-.714-2.196l-5.21-.418-2.008-4.826"
                        ></path>
                      </svg>
                    </div>
                    <span
                      aria-hidden="true"
                      class="ml-1 text-xs font-bold"
                    >{{ product.rating }}/5</span>
                  </div>
                </div>
                <span class="text-text-secondary text-xs ml-1">({{ product.reviews }})</span>
              </div>

              <!-- Price -->
              <div class="mt-1">
                <div class="text-text-muted text-xs">Starting at</div>
                <div class="flex flex-col">
                  <div class="flex flex-col text-text-primary text-sm">
                    <div class="font-bold">{{ formatPrice(product.price) }}</div>
                    <div
                      v-if="product.originalPrice"
                      class="text-text-muted line-through text-xs"
                    >
                      {{ formatPrice(product.originalPrice) }} <span>new</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ANTI-PATTERN (A11y): aria-expanded="yes" is invalid, should be "true" or "false" -->
        <button
          :aria-expanded="invalidAriaExpanded"
          class="mt-2 text-xs text-text-muted underline cursor-pointer"
          @click="showDetails = !showDetails"
        >
          {{ showDetails ? 'Hide details' : 'Show details' }}
        </button>
        <div
          v-if="showDetails"
          class="mt-2 text-xs text-text-muted"
        >
          {{ product.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

const showDetails = ref(false)

// ANTI-PATTERN: Invalid aria-expanded value ("yes" instead of "true"/"false")
const invalidAriaExpanded = 'yes' as unknown as boolean

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
