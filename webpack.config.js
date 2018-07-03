const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['./src/js/main.js', './src/scss/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // publicPath: 'dist/'
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
        test: /\.(css|scss)/,
        use: ExtractTextPlugin.extract([
          'css-loader', 'sass-loader'
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
