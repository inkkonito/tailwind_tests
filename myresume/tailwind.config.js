/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        ddred: '#EC5A5F',
        ddgreen: '#03DAC6',
        ddgrey: '#3D4751',
        ddblue: '#49BFF9',
        ddlightbleu: '#E9F2F4',
        ddbluejava: '#13B1B2',
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

