'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const path = require('path')

module.exports = (env, argv) => ({
  mode: argv.mode,
  entry: {
    main: `./src/templates/${config.template}/index.js`,
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/images'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/files'
            }
          }
        ]
      },
      {
        test: /\.s?css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin(Object.assign({}, config, {
      filename: 'index.html',
      template: `./src/templates/${config.template || 'default'}/index.html`,
      inject: true,
      meta: {
        author: 'Alexey Khrushch', // TODO
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: `Portfolio by Alexey Khrushch`, // TODO
        robots: 'index, follow'
      },
    })),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[hash].css',
      chunkFilename: 'static/css/[name].[hash].css'
    }),
    // TODO PWA
  ]
})
