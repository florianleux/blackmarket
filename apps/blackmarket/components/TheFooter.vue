<template>
  <div class="bg-bm-bg-alt border-t border-bm-border pt-10 pb-6 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <!-- ANTI-PATTERN #10: Skipped heading levels (h4 after h1, skipping h2/h3) -->
          <h4 class="text-base font-bold text-text-primary mb-4 font-title">BlackMarket</h4>
          <!-- ANTI-PATTERN #1: Low contrast text -->
          <div class="text-sm low-contrast leading-relaxed">
            The pirate marketplace for all your buccaneering needs. Quality gear, fair prices.
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-text-primary mb-4 font-title">Links</h4>
          <!-- ANTI-PATTERN #4: Empty links (no accessible name, href="#") -->
          <a href="#" class="block text-sm text-text-secondary mb-2 hover:text-text-primary"></a>
          <a href="#" class="block text-sm text-text-secondary mb-2 hover:text-text-primary">Terms</a>
          <a href="#" class="block text-sm text-text-secondary mb-2 hover:text-text-primary">Privacy</a>
          <a href="#" class="block text-sm low-contrast mb-2 hover:text-text-primary">FAQ</a>
        </div>

        <div>
          <h4 class="text-base font-bold text-text-primary mb-4 font-title">Contact</h4>
          <div class="text-sm low-contrast mb-2">ahoy@blackmarket.pirate</div>
          <div class="text-sm low-contrast mb-2">+1 (555) PIRATES</div>
          <div class="text-sm low-contrast">Tortuga Island, Caribbean</div>
        </div>

        <div>
          <h4 class="text-base font-bold text-text-primary mb-4 font-title">Follow Us</h4>
          <div class="flex gap-3">
            <!-- ANTI-PATTERN #4: Empty links (icon only, no text, no aria-label) -->
            <a href="#" class="text-xl p-1 hover:opacity-70">📘</a>
            <a href="#" class="text-xl p-1 hover:opacity-70">🐦</a>
            <a href="#" class="text-xl p-1 hover:opacity-70">📷</a>
            <a href="#" class="text-xl p-1 hover:opacity-70">🎬</a>
          </div>
        </div>
      </div>

      <div class="border-t border-bm-border pt-6 text-center">
        <div class="text-xs low-contrast">
          © 2024 BlackMarket. All rights reserved to pirates everywhere. ⚓
        </div>
      </div>
    </div>
  </div>
</template>
