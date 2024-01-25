/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        mainblue: "#2e61e6",
        textblue: "#171B4A",
      },
      colors: {
        mainblue: "#2e61e6",
        textblue: "#171B4A"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
