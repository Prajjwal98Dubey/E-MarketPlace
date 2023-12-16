/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        Roboto:["Roboto Condensed"," sans-serif"],
        Dosis:["Dosis","sans-serif"]
      },
      keyframes: {
        'fade': {
            '0%': {
                opacity: '0'
            },
            '100%': {
                opacity: '1'
            },
        }
    },
    animation: {
        'fade': 'fade 0.7s ease-in-out'
    }
    },
  },
  plugins: [],
}

