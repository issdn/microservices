/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "neo-1":
          "inset 5px 5px 10px -5px rgba(0, 0, 0, .25), inset -5px -5px 10px -5px rgba(255, 255, 255, 1)",
        "neo-1-violet":
          "inset 5px 5px 10px -5px rgba(0, 0, 0, .25), inset -5px -5px 10px -5px rgba(167, 139, 250, .9)",
      },
      colors: {
        secondary: "#eeebf0",
      },
      keyframes: {
        ripple: {
          to: {
            transform: "scale(3)",
            opacity: 0,
          },
        },
        slide: {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        ripple: "ripple 800ms linear",
        slide: "slide 800ms ease-in-out",
      },
      fonts: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
