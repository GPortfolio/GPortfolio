'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const user = require('./src/user')
const path = require('path')
const packageJson = require('./package')

module.exports = {
  mode: 'development',
  entry: {
    'dist/main': ['./src/js/main.js', './src/scss/main.scss']
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
    new HtmlWebpackPlugin(Object.assign({}, user, {
      filename: './index.html',
      template: './src/index.html'
    })),
    new SWPrecacheWebpackPlugin({
      cacheId: 'alexey-khrushch',
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
      name: 'Alexey Khrushch',
      short_name: 'A.K.',
      description: packageJson.description,
      background_color: '#fff',
      theme_color: '#fff',
      start_url: '/',
      icons: [{
        src: path.resolve('src/images/profile/avatar.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: 'dist/icons'
      }]
    })
  ]
}
