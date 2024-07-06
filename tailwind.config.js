/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./views/**/*.ejs", 
    "./app.js", 
    "./database.js", 
    "./input.css", 
"./views/error404.ejs"
  ],
 theme: {
  extend: {
    colors: {
      primary: '#3498db',
      secondary: '#f1c40f',
    },
    fontFamily: {
      sans: ['Arial','Open Sans', 'Sans-serif'],
    },
    spacing: {
      sm: '8px',
      md: '16px',
      lg: '24px',
    },
  },
},
  plugins: [],
  output: 'output.css',
}