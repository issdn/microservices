/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "neo-1":
          "inset 5px 5px 10px -5px rgba(0, 0, 0, .25), inset -5px -5px 10px -5px rgba(255, 255, 255, 1)",
      },
      colors: {
        secondary: "#eeebf0",
        majorelle: "#724CF9",
        "majorelle-dark": "#6242D6",
      },
    },
  },
  plugins: [],
};
