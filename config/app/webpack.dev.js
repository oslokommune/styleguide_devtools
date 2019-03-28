const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: 'src/app_dev.html'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|css)$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
    ]
  }
})

module.exports.devServer = {
  host: '0.0.0.0',
  port: 9000,
  overlay: true,
  contentBase: path.resolve(__dirname + '/../../dist')
}
