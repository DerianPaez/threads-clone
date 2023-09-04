import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-background": "#101010",
        "primary-elevate-background": "#181818",
        "secondary-text": "#777777",
      },
      keyframes: {
        rotateSlowly: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotateSlowly: "rotateSlowly 300s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
