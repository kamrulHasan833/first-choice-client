/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#c21b5e",
        "secondary-color": "#A39700",
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
