export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  ssr: true,

  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pirata+One&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-01-01',
})
