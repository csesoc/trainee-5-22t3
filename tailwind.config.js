/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
        '26': 'repeat(26, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))'
      },
      colors: {
        'theme-pinkblue': {
          0: 'rgba(0, 100, 200)',
          100: 'rgba(25, 100, 200)',
          200: 'rgba(51, 100, 200)',
          300: 'rgba(77, 100, 200)',
          400: 'rgba(102, 100, 200)',
          500: 'rgba(127, 100, 200)',
          600: 'rgba(153, 100, 200)',
          700: 'rgba(178, 100, 200)',
          800: 'rgba(204, 100, 200)',
          900: 'rgba(230, 100, 200)',
          1000: 'rgba(255, 100, 200)',
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}