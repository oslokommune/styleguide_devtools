const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.cjs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: 'styleguide.css',
      chunkFilename: '[id].styleguide.css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
    ]
  }
})
