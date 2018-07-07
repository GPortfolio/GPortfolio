'use strict'
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/js/main.js', './src/scss/main.scss'],
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
            loader: 'file-loader'
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      name: 'Alexey Khrushch',
      email: 'alexeykhr@outlook.com',
      social: {
        twitter: 'Alexeykhr_',
        github: 'Alexeykhr',
        linkedin: 'alexeykhr'
      }
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
}
