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
            ],
            defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
        }),
        process.env.NODE_ENV === 'production' ? require('cssnano')({ preset: 'default' }) : null,
        require('copyfiles')(
            ["./src/**/*.js",
                "./src/**/*.liquid",
                "./src/**/*.json",
                "./dist"
            ],
            {
                up : 1,
                verbose : false
            },
            (err) => {
                if(err) console.log(err);
            }
        )
    ]
}