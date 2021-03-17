const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './build/modules.js',
  output: {
    filename: 'modules.js',
    path: path.resolve('dist')
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/css/grid.css', to: 'assets/css/grid.css'
      }
    ])
  ],
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
          publicPath: '/assets/images/'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts',
          publicPath: '/assets/fonts/'
        }
      },
      {
        test: /\.(mp4|srt|vtt)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/video',
          publicPath: '/assets/video/'
        }
      }
    ]
  }
}
