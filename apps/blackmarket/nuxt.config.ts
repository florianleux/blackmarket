// ANTI-PATTERN: Baseline config with MAXIMUM performance issues
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  ssr: true,

  // ANTI-PATTERN #5: No compression
  nitro: {
    compressPublicAssets: false,
    minify: false,
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
  },

  app: {
    head: {
      // ANTI-PATTERN (A11y): Prevent zoom on mobile - breaks accessibility
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      ],
      // ANTI-PATTERN #4: Render-blocking external CSS
      link: [
        // ANTI-PATTERN #6 & #7: Render-blocking fonts with display=block (no swap)
        // ANTI-PATTERN #10: No preconnect for fonts.googleapis.com
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pirata+One&display=block' },
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
      // ANTI-PATTERN #9: MANY blocking third-party scripts in head
      script: [
        // ANTI-PATTERN (BP): document.write() during page load
        {
          innerHTML: `document.write('<div style="display:none">Injected via document.write</div>');`,
          tagPosition: 'head',
        },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js', tagPosition: 'head' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js', tagPosition: 'head' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js', tagPosition: 'head' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', tagPosition: 'head' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js', tagPosition: 'head' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js', tagPosition: 'head' },
      ],
    },
  },

  css: ['~/assets/css/custom.css'],

  compatibilityDate: '2024-01-01',
})
