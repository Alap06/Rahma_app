/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        secondary: '#00D4AA',
        accent: '#FF6B35',
        dark: '#0F172A',
        light: '#F8FAFC',
        success: '#10B981',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['Poppins'],
      },
    },
  },
  plugins: [],
};
