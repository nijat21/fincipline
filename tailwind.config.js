/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './index.html'
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['YourSansFont', 'ui-sans-serif', 'system-ui'],
        serif: ['YourSerifFont', 'ui-serif', 'Georgia'],
      },
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
        'md': '900px'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};