const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/app.html'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
    ]
  }
})
