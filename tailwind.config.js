/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './index.html'],
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
        'half-screen': '64vh',
        'screen': '94vh',
        '2screen': '188vh', // 2 times the screen height
        '3screen': '282vh', // 3 times the screen height
      },
      screens: {
        'md': '950px'
      }
    },
  },
  plugins: [],
};