// ANTI-PATTERN: Baseline config with MAXIMUM performance issues
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  ssr: true,

  // ANTI-PATTERN #5: No compression
  nitro: {
    compressPublicAssets: false,
    minify: false,
    preset: 'static',
    prerender: {
      failOnError: false, // Ignore 404 errors from missing pages
    },
  },

  // ANTI-PATTERN #8: Disable tree-shaking to include all unused code
  experimental: {
    treeshakeClientOnly: false,
  },

  // ANTI-PATTERN (BP #10): Source maps exposed in production
  sourcemap: {
    client: true,
    server: true,
  },

  // ANTI-PATTERN (BP): Enable source maps in Vite build
  vite: {
    build: {
      sourcemap: true,
    },
    optimizeDeps: {
      include: ['dayjs', 'dayjs/plugin/relativeTime', 'dayjs/locale/fr', 'dayjs/locale/es', 'dayjs/locale/de', 'dayjs/locale/it', 'dayjs/locale/pt', 'dayjs/locale/zh', 'dayjs/locale/ja', 'dayjs/locale/ko', 'dayjs/locale/ru', 'dayjs/locale/ar'],
    },
  },

  app: {
    head: {
      // ANTI-PATTERN (A11y): Prevent zoom on mobile - breaks accessibility
      // ANTI-PATTERN (SEO): noindex prevents search engine indexing (is-crawlable)
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      // ANTI-PATTERN #4: Render-blocking external CSS
      link: [
        // ANTI-PATTERN #6 & #7: Render-blocking fonts with display=block (no swap)
        // ANTI-PATTERN #10: No preconnect for fonts.googleapis.com
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=New+Rocker&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Modern+Antiqua&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=block' },
        // MORE blocking fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=block' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=block' },
        // ANTI-PATTERN #4: More render-blocking CSS
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css' },
      ],
      // ANTI-PATTERN #7: Blocking third-party scripts in head
      script: [
        // ANTI-PATTERN (BP): document.write() during page load
        {
          innerHTML: `document.write('<div style="display:none">Injected via document.write</div>');`,
          tagPosition: 'head',
        },
        // ANTI-PATTERN #7: GSAP loaded synchronously in head (used for product card hover animations)
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', tagPosition: 'head' },
      ],
    },
  },

  css: ['~/assets/css/custom.css'],

  // Transpile dayjs for SSG compatibility
  build: {
    transpile: ['dayjs'],
  },

  compatibilityDate: '2024-01-01',
})
