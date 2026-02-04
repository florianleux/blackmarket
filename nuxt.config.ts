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
        // Preconnect for faster font loading
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Fonts with display=swap for better FCP
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=New+Rocker&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@400;500;600;700&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/custom.css'],

  compatibilityDate: '2024-01-01',
})
