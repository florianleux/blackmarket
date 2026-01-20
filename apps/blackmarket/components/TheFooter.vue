<template>
  <div class="bg-bm-bg-alt border-t border-bm-border pt-10 pb-6 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <!-- ANTI-PATTERN (SEO): Another h1 tag (multiple h1 on page) -->
          <h1 class="text-base font-bold text-text-primary mb-4 font-title">BlackMarket</h1>
          <!-- ANTI-PATTERN #1: Low contrast text -->
          <div class="text-sm low-contrast leading-relaxed">
            The pirate marketplace for all your buccaneering needs. Quality gear, fair prices.
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-text-primary mb-4 font-title">Links</h4>
          <!-- ANTI-PATTERN #4: Empty links (no accessible name, href="#") -->
          <a href="#" class="block text-sm text-text-secondary mb-2 hover:text-text-primary"></a>
          <!-- ANTI-PATTERN (SEO): Generic link text -->
          <a href="#" class="block text-sm text-text-secondary mb-2 hover:text-text-primary">Click here</a>
          <a href="#" class="block text-sm text-text-secondary mb-2 hover:text-text-primary">Read more</a>
          <a href="#" class="block text-sm low-contrast mb-2 hover:text-text-primary">Learn more</a>
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
            <!-- ANTI-PATTERN (A11y): Empty links + ANTI-PATTERN (BP): External links without rel="noopener" -->
            <a href="https://facebook.com" target="_blank" class="text-xl p-1 hover:opacity-70">📘</a>
            <a href="https://twitter.com" target="_blank" class="text-xl p-1 hover:opacity-70">🐦</a>
            <a href="https://instagram.com" target="_blank" class="text-xl p-1 hover:opacity-70">📷</a>
            <a href="https://youtube.com" target="_blank" class="text-xl p-1 hover:opacity-70">🎬</a>
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
