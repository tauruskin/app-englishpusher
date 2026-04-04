/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./word-connections/index.html", "./c1-trivia/index.html", "./c1-business/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        brand: "#f07c1a",
      },
    },
  },
  plugins: [],
};
