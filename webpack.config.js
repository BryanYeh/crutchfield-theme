var path = require("path");
const glob = require("glob");
const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";
const live_watch = process.env.THEME_ENV === "live" ? "shopify-themekit watch --allow-live" : "shopify-themekit watch"
const live_deploy = process.env.THEME_ENV === "live" ? "shopify-themekit deploy --allow-live" : "shopify-themekit deploy"
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: mode,
  entry: glob.sync("./src/js/**/*.js").reduce((acc, path) => {
    const entry = path.replace(/^.*[\\\/]/, "").replace(".js", "");
    acc[entry] = path;
    return acc;
  }, { index: './src/js/application.js'}),
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //   { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-import")(),
                  require("tailwindcss")("./tailwind.config.js"),
                  require("autoprefixer"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /\/src/,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        exclude: /\/src/,
      }),
    ],
  },
};

if (mode === "development") {
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: [
          "echo Webpack build in progress..."
        ],
      },
      onBuildEnd: {
        scripts:
        [
          "echo Build Complete",
          live_deploy,
          live_watch,
          "shopify-themekit open",
        ],
        parallel: false,
      },
    })
  );
}
