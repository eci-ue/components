/** @type {import('tailwindcss').Config} */

const path = require("path");
const color = require("@ue/style");
const src = path.join(__dirname, "node_modules", "@ue/style/style/variables.less");

const variables = color(src, {
  red: "#E57373",
  yellow: "#FAAD14",
  primary: "#54B9E4",
});


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
      spacing: {},
      height: {},
      minHeight: {},
      maxHeight: {},
      width: {},
      minWidth: {},
      maxWidth: {},
      lineHeight: {
        "12.5": "3.125rem",
      },
      colors: variables,
    },
  },
}
