/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      grayscale: {
        '50': '50%', // Custom grayscale value
      },
      backgroundImage: {
        'bkg': "url('/assets/background.jpg')",
      },
      height: {
        'home-screen': '88vh',
        'screen': '92vh',
        '2screen': '184vh', // 2 times the screen height
        '3screen': '276vh', // 3 times the screen height
      },
      screens: {
        'md': '950px'
      }
    },
  },
  plugins: [],
};