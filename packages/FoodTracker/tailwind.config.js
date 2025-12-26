/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#E4B962',      // Primary Gold - Actions, Highlights
        },
        surface: {
          base: '#201B12',      // Base Dark - App Background
          card: '#2D281E',      // Surface Dark - Cards, Modals
          elevated: '#3D3828',  // Lighter surface for hover states
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    'autoprefixer',
  ],
}
