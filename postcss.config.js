module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/layout/*.liquid',
        './src/templates/*.liquid',
        './src/sections/*.liquid',
        './src/snippets/*.liquid',
        './src/config/settings_schema.json',
        './src/assets/application.js'
      ],
      defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
    }),
    process.env.NODE_ENV === 'production' ? require('cssnano')({ preset: 'default' }) : null,
    require('copyfiles')(
      ["./src/**/*.js",
        "./src/**/*.liquid",
        "./src/**/*.json",
        "./src/assets/*.css",
        "./dist"
      ],
      {
        up: 1,
        verbose: false
      },
      (err) => {
        if (err) console.log(err);
      }
    )
  ]
}