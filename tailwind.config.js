const mode = process.env.NODE_ENV === "production";

module.exports = {
  purge: {
    enabled: mode,
    content: [
      './src/js/**/*.js',
      './dist/layout/*.liquid',
      './dist/templates/*.liquid',
      './dist/templates/customers/*.liquid',
      './dist/sections/*.liquid',
      './dist/snippets/*.liquid'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '96': '24rem',
        '40': '10rem'
      }
    },
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      animation: ['group-hover'],
      display: ['group-hover'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
