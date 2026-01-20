// BASELINE CONFIG - Contains intentional anti-patterns for demonstration
// This configuration is designed to produce poor Lighthouse scores

export default defineNuxtConfig({
  devtools: { enabled: true },

  // ANTI-PATTERN: Disable SSR optimization features
  ssr: true,

  // ANTI-PATTERN: No compression, no minification for baseline
  nitro: {
    compressPublicAssets: false,
    minify: false,
  },

  // ANTI-PATTERN: No image optimization
  image: {
    // Disabled - images will be served as-is (heavy PNGs)
  },

  // ANTI-PATTERN: Load all JS upfront, no code splitting
  experimental: {
    payloadExtraction: false,
    treeshakeClientOnly: false,
  },

  // ANTI-PATTERN: No route preloading
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },

  app: {
    // ANTI-PATTERN: No meta tags defined at app level
    head: {
      // Intentionally empty - no title, no meta, no favicon
      // This will trigger SEO anti-patterns
    },
  },

  // ANTI-PATTERN: Load CSS globally without optimization
  css: ['~/assets/css/main.css'],

  // ANTI-PATTERN: No font optimization
  // Fonts will be loaded without font-display: swap

  compatibilityDate: '2024-01-01',
})
