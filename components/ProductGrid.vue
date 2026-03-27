<template>
  <div>
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

    <!-- Masonry container: real cards + ghost elements -->
    <div
      ref="masonryContainer"
      class="masonry-container"
    >
      <!-- Real product cards -->
      <div
        v-for="product in products"
        :key="product.id"
        class="masonry-item masonry-real"
      >
        <ProductCard :product="product" />
      </div>

      <!-- Ghost elements for TBT (client-only to avoid SSR hydration mismatch) -->
      <template v-if="isClient">
        <div
          v-for="i in ghostCount"
          :key="'ghost-' + i"
          class="masonry-item masonry-ghost"
        >
          <div class="p-4">
            <div style="height: 192px;"></div>
            <div style="height: 16px; margin-top: 8px;"></div>
            <div style="height: 16px; margin-top: 4px; width: 66%;"></div>
            <div style="height: 24px; margin-top: 8px;"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  products: Product[]
  title?: string
  showViewAll?: boolean
}>()

const GHOST_COUNT = 988
const ghostCount = GHOST_COUNT
const isClient = ref(false)
const masonryContainer = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

// Watch for products to be loaded (they arrive async from API)
watch(() => props.products.length, async (len) => {
  if (len > 0) {
    await nextTick()
    // Wait for images to have dimensions before running masonry
    const images = masonryContainer.value?.querySelectorAll('img') as NodeListOf<HTMLImageElement>
    if (images && images.length > 0) {
      await Promise.all(
        Array.from(images).map(img =>
          img.complete ? Promise.resolve() : new Promise(resolve => {
            img.onload = resolve
            img.onerror = resolve
          })
        )
      )
    }
    runMasonryLayout()
  }
})

// Re-run masonry when container resizes (e.g. when sidebar ads appear)
onMounted(() => {
  isClient.value = true
  if (masonryContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      if (props.products.length > 0) {
        runMasonryLayout()
      }
    })
    resizeObserver.observe(masonryContainer.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

function runMasonryLayout() {
  const container = masonryContainer.value
  if (!container) return

  const allItems = container.querySelectorAll('.masonry-item') as NodeListOf<HTMLElement>
  if (allItems.length === 0) return

  const containerWidth = container.offsetWidth
  const viewportWidth = window.innerWidth
  let colCount = 1
  if (viewportWidth >= 1280) colCount = 4
  else if (viewportWidth >= 1024) colCount = 3
  else if (viewportWidth >= 640) colCount = 2

  const gap = 16
  const colWidth = (containerWidth - gap * (colCount - 1)) / colCount
  const colHeights = new Array(colCount).fill(0)

  // Classic masonry: read offsetHeight then write style — forced reflow each iteration
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i]
    item.style.position = 'absolute'
    item.style.width = colWidth + 'px'

    const shortestCol = colHeights.indexOf(Math.min(...colHeights))
    const height = item.offsetHeight
    item.style.top = colHeights[shortestCol] + 'px'
    item.style.left = (shortestCol * (colWidth + gap)) + 'px'
    colHeights[shortestCol] += height + gap
  }

  const ghosts = container.querySelectorAll('.masonry-ghost') as NodeListOf<HTMLElement>
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].style.display = 'none'
  }

  const realItems = container.querySelectorAll('.masonry-real') as NodeListOf<HTMLElement>
  let maxBottom = 0
  for (let i = 0; i < realItems.length; i++) {
    const top = parseFloat(realItems[i].style.top || '0')
    const height = realItems[i].offsetHeight
    maxBottom = Math.max(maxBottom, top + height)
  }
  container.style.height = (maxBottom + gap) + 'px'
}
</script>

<style scoped>
.masonry-container {
  position: relative;
  overflow: hidden;
}

.masonry-ghost {
  color: transparent;
  pointer-events: none;
  opacity: 0;
}
</style>
