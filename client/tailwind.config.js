/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
      colors: {
        "accent": "#EAC885",
        "primary": "#292929",
        "secondary": "#3D3D3D",
        "success": "#62C25B",
        "dominant": "#E0E0E0",
        "compliment": "#B8B8B8",
      },
    },
  },
  plugins: [],
};
