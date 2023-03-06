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
      colors: {
        red: "#E57373",
        yellow: "#FAAD14",

        primary: "#54B9E4",
        "primary-200": "#F2F9FE",
        "primary-500": "#7BD2F8",

        "error": "#FF4D4F",
        "error-200": "#FFF0F0",
        "error-500": "#FF8384",

        "pending": "#FAAD14",
        "pending-200": "#FFF9EC",
        "pending-500": "#FFBE3D",

        "progress": "#FAAD14",
        "progress-200": "#FFF9EC",
        "progress-500": "#FFBE3D",

      },
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
