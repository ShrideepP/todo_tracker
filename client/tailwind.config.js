/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
      },
      colors: {
        "primary": "#FE8E8B",
        "secondary": "#C445D5",
        "dominant": "#F5F5F5",
        "compliment": "#A3A3A3",
        "background": "#17181F",
      }
    },
  },
  plugins: [],
};
