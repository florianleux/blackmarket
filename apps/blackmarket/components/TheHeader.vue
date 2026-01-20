<template>
  <!-- ANTI-PATTERN: Using div instead of semantic header element -->
  <div class="header">
    <!-- ANTI-PATTERN: Using div instead of nav element -->
    <div class="header-logo">
      <!-- ANTI-PATTERN: Image without alt, width, height -->
      <img src="/images/logo.png" class="logo" />
      <span class="brand-name">BlackMarket</span>
    </div>

    <!-- ANTI-PATTERN: Using div instead of nav element -->
    <div class="header-nav">
      <!-- ANTI-PATTERN: Using divs instead of proper list structure -->
      <div class="nav-item">
        <span class="nav-link">Accueil</span>
      </div>
      <div class="nav-item">
        <span class="nav-link">Produits</span>
      </div>
      <div class="nav-item">
        <span class="nav-link">Catégories</span>
      </div>
      <div class="nav-item">
        <span class="nav-link">À propos</span>
      </div>
    </div>

    <div class="header-actions">
      <!-- ANTI-PATTERN: Button without accessible label, using div -->
      <div class="action-btn search-btn">
        <span>🔍</span>
      </div>
      <!-- ANTI-PATTERN: Button without accessible label -->
      <div class="action-btn cart-btn">
        <span>🛒</span>
        <span class="cart-count">0</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ANTI-PATTERN: No accessibility considerations
// No keyboard navigation support
</script>

<style scoped>
/* ANTI-PATTERN: Using non-accessible color contrasts */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #1a1a2e;
  color: #666; /* ANTI-PATTERN: Low contrast text */
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 40px;
}

.brand-name {
  font-size: 24px;
  font-weight: bold;
  color: #888; /* ANTI-PATTERN: Low contrast */
}

.header-nav {
  display: flex;
  gap: 24px;
}

.nav-item {
  cursor: pointer;
}

.nav-link {
  color: #777; /* ANTI-PATTERN: Low contrast */
  font-size: 14px;
}

/* ANTI-PATTERN: Removing focus outline for "aesthetics" */
.nav-link:focus {
  outline: none;
}

.header-actions {
  display: flex;
  gap: 16px;
}

/* ANTI-PATTERN: Touch target too small (less than 44px) */
.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
  background: #2a2a4a;
}

.cart-count {
  background: #ff6b35;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
}
</style>
