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
      boxShadow: {
        'main': '60px 60px 60px 60px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};
