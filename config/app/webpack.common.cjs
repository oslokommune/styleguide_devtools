const VueLoaderPlugin = require('vue-loader/lib/plugin')
const DotEnv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: __dirname + '/../../dist',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json'],
    symlinks: false,
    fallback: {
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg|ico)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images/',
          publicPath: '/assets/images/'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts/',
          publicPath: '/assets/fonts/'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DotEnv(),
    new HtmlWebpackPlugin({
      template: 'src/app.html'
    }),
    new ESLintPlugin({
      failOnWarning: true,
      failOnError: true
    }),
  ]
}
