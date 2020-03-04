module.exports = {
  plugins: [
    require('postcss-import'),
    // require('postcss-less'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')
  ]
}
