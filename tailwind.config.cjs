/** @type {import('tailwindcss').Config} */

const config = require("./tailwind/config.cjs");

module.exports = {
  important: ".eci",
  darkMode: "class",
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './test/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@ue/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: config.colors,
      spacing: config.spacing,
      height: config.height,
      minHeight: config.minHeight,
      maxHeight: config.maxHeight,
      width: config.width,
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      lineHeight: config.lineHeight,
      screens: {},
    },
  },
}
