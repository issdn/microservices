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
        "secondary-tint": "#f8f7f9",
        "secondary-shade": "#d6d4d8",
      },
      keyframes: {
        ripple: {
          to: {
            transform: "scale(3)",
            opacity: 0,
          },
        },
        slideY: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        scaleY: {
          "0%": {
            transform: "scaleY(0)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
      },
      animation: {
        ripple: "ripple 800ms linear",
        slideY: "slideY 300ms ease-in-out",
        scaleY: "scaleY 100ms ease-out",
      },
      fonts: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-no-scrollbar")],
};
