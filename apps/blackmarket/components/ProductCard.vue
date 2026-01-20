<template>
  <!-- ANTI-PATTERN: Using div instead of article element -->
  <div class="product-card">
    <!-- ANTI-PATTERN: Image without width/height attributes (causes CLS) -->
    <!-- ANTI-PATTERN: Image without meaningful alt text -->
    <!-- ANTI-PATTERN: Large unoptimized image format -->
    <div class="product-image-container">
      <img
        :src="product.image"
        alt="product"
        class="product-image"
        loading="eager"
      />
      <div v-if="product.badge" class="product-badge">
        {{ product.badge }}
      </div>
    </div>

    <div class="product-info">
      <!-- ANTI-PATTERN: No proper heading hierarchy -->
      <div class="product-name">{{ product.name }}</div>

      <div class="product-rating">
        <!-- ANTI-PATTERN: Using emoji without aria-label -->
        <span class="stars">{{ getStars(product.rating) }}</span>
        <span class="review-count">({{ product.reviews }})</span>
      </div>

      <div class="product-description">{{ product.description }}</div>

      <div class="product-pricing">
        <span class="current-price">{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice" class="original-price">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- ANTI-PATTERN: Button without proper accessible name -->
      <!-- ANTI-PATTERN: Small touch target -->
      <div class="product-actions">
        <div class="btn-add-cart" @click="addToCart">
          Ajouter au panier
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

const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} €`
}

const getStars = (rating: number): string => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  let stars = '★'.repeat(fullStars)
  if (hasHalf) stars += '½'
  stars += '☆'.repeat(5 - Math.ceil(rating))
  return stars
}

const addToCart = () => {
  // ANTI-PATTERN: No feedback to user, no accessible announcement
  console.log('Added to cart:', props.product.id)
}
</script>

<style scoped>
/* ANTI-PATTERN: Low contrast colors throughout */
.product-card {
  background: #1e1e2e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image-container {
  position: relative;
  /* ANTI-PATTERN: No aspect ratio set, causes CLS */
  background: #2a2a3e;
}

.product-image {
  width: 100%;
  display: block;
  /* ANTI-PATTERN: No explicit height, causes CLS */
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff6b35;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #aaa; /* ANTI-PATTERN: Low contrast */
  margin-bottom: 8px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stars {
  color: #f5a623;
  font-size: 14px;
}

.review-count {
  color: #666; /* ANTI-PATTERN: Very low contrast */
  font-size: 12px;
}

.product-description {
  font-size: 13px;
  color: #777; /* ANTI-PATTERN: Low contrast */
  margin-bottom: 12px;
  line-height: 1.4;
  /* ANTI-PATTERN: Text truncation without tooltip */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.current-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b35;
}

.original-price {
  font-size: 14px;
  color: #666;
  text-decoration: line-through;
}

.product-actions {
  display: flex;
}

/* ANTI-PATTERN: Touch target too small, low contrast */
.btn-add-cart {
  flex: 1;
  background: #3a3a5a;
  color: #999; /* ANTI-PATTERN: Low contrast */
  padding: 8px 12px; /* ANTI-PATTERN: Small touch target */
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

/* ANTI-PATTERN: Removing focus outline */
.btn-add-cart:focus {
  outline: none;
}

.btn-add-cart:hover {
  background: #4a4a6a;
}
</style>
