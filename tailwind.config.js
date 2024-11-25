/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'open': ["Open Sans", "sans-serif"],
        'nuni': ["Nunito", "sans-serif"],
        'pops': ["Poppins", "serif"],
      },
      backgroundImage: {
        'mobile': "url('/src/assets/bg.png')"
      },
    },
  },
  plugins: [],
};
