const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './*.region',
    './blocks/*.block',
    './collections/*.list',
    './collections/*.item'
  ],
  defaultExtractor: content => {
    const match = content.match(/[\w-/:]+(?<!:)/g) || [];
    console.log(match);
    return match
  }
})
module.exports = {
  plugins: [
    require('postcss-import'),
    // require('postcss-less'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')
    [purgecss]
  ]
}
