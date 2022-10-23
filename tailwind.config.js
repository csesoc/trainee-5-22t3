/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '21': 'repeat(21, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '23': 'repeat(23, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
        '25': 'repeat(25, minmax(0, 1fr))',
        '26': 'repeat(26, minmax(0, 1fr))',
        '27': 'repeat(27, minmax(0, 1fr))',
        '28': 'repeat(28, minmax(0, 1fr))',
        '29': 'repeat(29, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
        '31': 'repeat(31, minmax(0, 1fr))',
        '32': 'repeat(32, minmax(0, 1fr))',
        '33': 'repeat(33, minmax(0, 1fr))',
        '34': 'repeat(34, minmax(0, 1fr))',
        '35': 'repeat(35, minmax(0, 1fr))',
        '36': 'repeat(36, minmax(0, 1fr))',
        '37': 'repeat(37, minmax(0, 1fr))',
        '38': 'repeat(38, minmax(0, 1fr))',
        '39': 'repeat(39, minmax(0, 1fr))',
        '40': 'repeat(40, minmax(0, 1fr))',
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