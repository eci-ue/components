/** @type {import('tailwindcss').Config} */


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
      colors: {},
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
    },
  },
}
