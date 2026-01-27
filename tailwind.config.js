/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Light theme (BackMarket style)
        bm: {
          bg: '#ffffff',
          'bg-alt': '#f7f7f7',
          'bg-badge': '#f0f0f0',
          border: '#e5e5e5',
          'border-light': '#f0f0f0',
        },
        text: {
          primary: '#0d0d0d',
          secondary: '#4a4a4a',
          muted: '#8a8a8a',
          light: '#b0b0b0',
        },
        accent: {
          DEFAULT: '#ff6b35',
          hover: '#e85a28',
          light: '#fff5f0',
        },
        success: '#00a656',
      },
      fontFamily: {
        sans: ['"Cormorant Upright"', 'system-ui', 'sans-serif'],
        title: ['"Pirata One"', 'cursive'],
      },
    },
  },
  plugins: [],
}
