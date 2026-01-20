<template>
  <!-- ANTI-PATTERN: Using div instead of semantic footer element -->
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-title">BlackMarket</div>
        <div class="footer-text">
          La marketplace pirate pour tous vos besoins de flibustier.
        </div>
      </div>

      <div class="footer-section">
        <div class="footer-title">Liens</div>
        <!-- ANTI-PATTERN: Using divs instead of proper list -->
        <div class="footer-link">Conditions générales</div>
        <div class="footer-link">Politique de confidentialité</div>
        <div class="footer-link">FAQ</div>
      </div>

      <div class="footer-section">
        <div class="footer-title">Contact</div>
        <div class="footer-text">contact@blackmarket.pirate</div>
        <div class="footer-text">+33 1 23 45 67 89</div>
      </div>

      <div class="footer-section">
        <div class="footer-title">Réseaux</div>
        <!-- ANTI-PATTERN: Links without href, no accessible labels -->
        <div class="social-links">
          <span class="social-icon">📘</span>
          <span class="social-icon">🐦</span>
          <span class="social-icon">📷</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">© 2024 BlackMarket. Tous droits réservés aux pirates.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ANTI-PATTERN: No accessibility, no structured data
</script>

<style scoped>
/* ANTI-PATTERN: Low contrast colors */
.footer {
  background: #0f0f1a;
  color: #555; /* ANTI-PATTERN: Very low contrast */
  padding: 48px 24px 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  min-width: 200px;
}

.footer-title {
  font-size: 16px;
  font-weight: bold;
  color: #777; /* ANTI-PATTERN: Low contrast */
  margin-bottom: 16px;
}

.footer-text {
  font-size: 14px;
  margin-bottom: 8px;
  color: #555; /* ANTI-PATTERN: Very low contrast */
}

.footer-link {
  font-size: 14px;
  margin-bottom: 8px;
  color: #666; /* ANTI-PATTERN: Low contrast */
  cursor: pointer;
}

/* ANTI-PATTERN: Removing focus outline */
.footer-link:focus {
  outline: none;
}

.social-links {
  display: flex;
  gap: 12px;
}

/* ANTI-PATTERN: Touch target too small */
.social-icon {
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}

.footer-bottom {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #1a1a2e;
  text-align: center;
}

.copyright {
  font-size: 12px;
  color: #444; /* ANTI-PATTERN: Very low contrast */
}
</style>
