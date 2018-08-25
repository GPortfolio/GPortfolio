'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const packageJson = require('./package')
const config = require('./src/config')

module.exports = {
  mode: 'development',
  entry: {
    'dist/main': [
      `./src/templates/t${config.app_template}/js/index.js`,
      `./src/templates/t${config.app_template}/scss/index.scss`
    ]
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'dist/static/',
              publicPath: 'static/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin('[name].css'),
    new HtmlWebpackPlugin(Object.assign({}, config, {
      filename: './index.html',
      template: `./src/templates/t${config.app_template}/index.html`,
      full_name: `${config.first_name} ${config.last_name}`,
      github_url: packageJson.homepage,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true
      },
      meta: {
        author: packageJson.author,
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: `Portfolio by ${config.first_name} ${config.last_name}`,
        robots: 'index, follow'
      },
      chunksSortMode: 'dependency'
    })),
    new SWPrecacheWebpackPlugin({
      cacheId: `${config.first_name.toLowerCase()}-${config.last_name.toLowerCase()}`,
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      navigateFallback: '/',
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /asset-manifest\.json$/
      ]
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      includeDirectory: true,
      orientation: 'any',
      lang: 'en-US',
      name: `${config.first_name} ${config.last_name}`,
      short_name: `CV ${config.first_name.charAt(0)}.${config.last_name.charAt(0)}.`,
      description: packageJson.description,
      background_color: config.app_background,
      theme_color: config.app_theme,
      start_url: '/',
      icons: [{
        src: config.app_icon,
        sizes: [96, 128, 192, 256, 384, 512],
        destination: 'dist/icons'
      }]
    })
  ]
}
