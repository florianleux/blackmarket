// BASELINE CONFIG - Contains intentional anti-patterns for demonstration
// This configuration is designed to produce poor Lighthouse scores

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Tailwind CSS module
  modules: ['@nuxtjs/tailwindcss'],

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
    // ANTI-PATTERN: No meta tags, no preconnect, no preload
    head: {
      // Intentionally minimal - no optimizations
      link: [
        // ANTI-PATTERN: No preconnect for Google Fonts (slow connection establishment)
        // ANTI-PATTERN: Loading font with default font-display (causes FOIT)
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pirata+One&display=block' },
      ],
      // ANTI-PATTERN: Blocking script in head (blocks HTML parsing)
      script: [
        {
          innerHTML: `
            // ANTI-PATTERN: Synchronous blocking script
            // This blocks HTML parsing and delays First Contentful Paint
            (function() {
              var start = Date.now();
              while (Date.now() - start < 100) {} // Artificial 100ms delay
              console.log('Blocking script executed');
            })();
          `,
        },
      ],
    },
  },

  // ANTI-PATTERN: Load CSS globally without optimization
  css: ['~/assets/css/main.css'],

  // ANTI-PATTERN: No font optimization
  // Fonts will be loaded without font-display: swap

  compatibilityDate: '2024-01-01',
})
