/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-35": "rgba(0, 0, 0, 0.35)",
        "black-50": "rgba(0, 0, 0, 0.5)",
        "black-75": "rgba(0, 0, 0, 0.75)",
        "black-65": "rgba(0, 0, 0, 0.65)",
        backgroundColor: "#FFF8F4",
        primary: "#F2851C",
      },
      screens: {
        phone: { max: "640px" },
        "xs-phone": { max: "400px" },
      },
    },
  },
  plugins: [],
});
