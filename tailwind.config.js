/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins, sans-serif",
      },
      colors: {
        "body-bg-color": "#0e1013",
        "text-color": "#fefefe",
        "cards-bg": "#282a2d",
        "header-bg": "#9338f4",
        "header-text": "#ffffff",
        "td-even": "#242528",
        "td-odd": "#282a2d",
      },
    },
  },
  plugins: [],
};
