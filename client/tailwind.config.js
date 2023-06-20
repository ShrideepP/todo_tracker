/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito-sans': ['Nunito Sans', 'sans-serif']
      },
      colors: {
        'dominant': '#F5F5F5',
        'compliment': '#A3A3A3',
        'background': '#0A0A0A'
      },
    },
  },
  plugins: [],
}