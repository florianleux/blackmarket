// Clean Nuxt config - optimized for performance
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  ssr: true,

  // Optimized Nitro config
  nitro: {
    compressPublicAssets: true,
    minify: true,
    preset: 'static',
    prerender: {
      failOnError: false,
    },
  },

  // Enable tree-shaking
  experimental: {
    treeshakeClientOnly: true,
  },

  // Disable source maps in production
  sourcemap: {
    client: false,
    server: false,
  },

  vite: {
    build: {
      sourcemap: false,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'BlackMarket - Premium refurbished pirate gear' },
      ],
      link: [
        // Preload critical fonts for faster FCP/LCP
        { rel: 'preload', href: '/fonts/cormorant-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/new-rocker.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        // Preload hero image for better LCP
        { rel: 'preload', href: '/images/hero-banner.webp', as: 'image', type: 'image/webp' },
      ],
    },
  },

  css: ['~/assets/css/custom.css'],

  compatibilityDate: '2024-01-01',
})
