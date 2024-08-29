/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue-custom': '#0070C4',
        'gray-custom': '#253850',
        'gray-secundary': '#F5F6FD',
      }
    },
  },
  plugins: [],
}
