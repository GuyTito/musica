/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-alt": "rgba(26, 30, 31, 1)",
        "secondary": "#FACD66",
        "light": "rgba(239, 238, 224, 1)",
        "light-o": "rgba(239, 238, 224, 0.25)",
        "primary": "#A4C7C6",
        "dark": "#1D2123",
        "alt": "#A4C7C6",
      },
      fontFamily: {
        serif: ["Quicksand", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
