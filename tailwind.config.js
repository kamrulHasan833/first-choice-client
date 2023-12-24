/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#6E3EB8",
        "secondary-color": "#c21b5e",
        "title-color": "#000000",
        "desc-color": "#A4A4A4",
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      },
      maxWidth: {
        standard: "96rem",
        large: "120rem",
        small: "64rem",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
