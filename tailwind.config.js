/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'charcoal': '#2F4550',
        'pa-grey': '#586F7C',
        'light-blue': '#b9DBD9',
        'ghost-white': '#F4F4F9',
        'dark-blue': '#4285F4',
      },
      backgroundImage: theme => ({
        'screen-image': "url('/assets/wallhaven-4veopp.png')",        
      }),
      fontFamily: {
        'nelphim': ['nelphim', 'sans-serif'],
      },
      fontSize: {
        'huge': '10rem', // You can adjust this value as needed
      }
    },
  },
  variants: {
    extend: {
      sepia: ['responsive', 'hover'],
      hueRotate: ['responsive', 'hover'],
    },
  },
  plugins: [
    require('daisyui')
  ],
}