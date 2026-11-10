/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F8F6',
        text: '#1A1A1A',
        ink: '#0B0B0B',
        sage: '#8A9A8B',
        terracotta: '#C76A4A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        display: ['Oswald', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
