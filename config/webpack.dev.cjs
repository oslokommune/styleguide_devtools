const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  cache: true,
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules', 'node_modules/styleguide/src']
              },
              sourceMap: true
            },
          }
        ]
      },
    ]
  }
})

module.exports.devServer = {
  host: '0.0.0.0',
  hot: true,
  port: 9000,
  static: [
    {
      directory: path.resolve(__dirname + '/../dist'),
      watch: false
    }
  ],
  devMiddleware: {
    writeToDisk: true
  }
}
