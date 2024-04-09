/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        ddblue: "#49bff9",
        ddred: "#ec5a5f",
        ddgreen: "#03dac6",
        ddgrey: "#3d4751",
        ddwhite: "#e9f2f4",
      },
    },
  },
  plugins: [],
};
