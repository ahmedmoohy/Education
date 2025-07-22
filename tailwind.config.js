/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF', // Apple-like Blue
        secondary: '#5AC8FA', // Lighter Blue
        accent: '#FF2D55', // Red for accents
        background: '#F5F5F7', // Light gray background
        card: '#FFFFFF', // White cards
        text: '#1D1D1F', // Dark text
        lightText: '#8E8E93', // Light gray text
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Roboto', 'sans-serif'], // Emulate Apple's font
      },
      boxShadow: {
        'apple-light': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.1)',
        'apple-medium': '0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
