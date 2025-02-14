/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#380A48',
          mainPink: '#E32B8D'
        },
        secondary: {
          main: '#961798',
        }

      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"], 
      },
    },
  },
  plugins: [],
}

