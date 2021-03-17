const VueLoaderPlugin = require('vue-loader/lib/plugin')
const DotEnv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    symlinks: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true
        }
      },
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
        test: /\.(woff)/,
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
    })
  ]
}
