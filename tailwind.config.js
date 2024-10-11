/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'], 
    },
    extend: {
      colors: {
        'blue-custom': '#0070C4',
        'gray-custom': '#253850',
        'gray-secundary': '#F5F6FD',
        'white-custom': 'rgb(255, 255, 255)',
      },
    },
  },
  plugins: [],
}
