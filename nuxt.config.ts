// BASELINE: Maximum performance anti-patterns
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  ssr: true,

  // ANTI-PATTERN: Disable compression for larger file sizes
  nitro: {
    compressPublicAssets: false,
    minify: false,
    preset: 'static',
    prerender: {
      failOnError: false,
    },
  },

  // ANTI-PATTERN: Disable tree-shaking
  experimental: {
    treeshakeClientOnly: false,
  },

  // ANTI-PATTERN: Expose source maps in production
  sourcemap: {
    client: true,
    server: true,
  },

  vite: {
    build: {
      sourcemap: true,
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
        // ==========================================================
        // ANTI-PATTERN FCP-A: Google Fonts CDN with display=block
        // 6 fonts loaded from external CDN - causes FOIT and network latency
        // ==========================================================
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=New+Rocker&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@400;500;600;700&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=block' },

        // ==========================================================
        // ANTI-PATTERN FCP-B: Render-blocking external CSS (~350KB)
        // Bootstrap and Animate.css loaded synchronously
        // ==========================================================
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css' },
      ],
      script: [
        // ==========================================================
        // ANTI-PATTERN LCP-B: Blocking script in head
        // GSAP loaded synchronously - blocks rendering
        // ==========================================================
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', tagPosition: 'head' },

        // ==========================================================
        // ANTI-PATTERN TBT-B: document.write() blocks parsing
        // ==========================================================
        {
          innerHTML: `document.write('<div style="display:none">Injected via document.write</div>');`,
          tagPosition: 'head',
        },
      ],
    },
  },

  css: ['~/assets/css/custom.css'],

  compatibilityDate: '2024-01-01',
})
