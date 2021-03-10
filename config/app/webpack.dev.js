const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')()
            ]
          }
        }, 'resolve-url-loader', 'sass-loader?sourceMap']
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
