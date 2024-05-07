/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "omega-bold": ["omega-bold", "sans-serif"],
      },
      colors: {
        "_red": "rgb(196,13,46)",
        "_grey": "rgb(85,85,85)",
        "_lightgrey": "rgb(226,226,226)",
        "_verylightgrey": "rgb(249,249,249)" 
      },
    },
  },
  plugins: [],
}

