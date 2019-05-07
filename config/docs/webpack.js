var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractChangelog = new ExtractTextPlugin('changelog/index.html')
const extractUtils = new ExtractTextPlugin('utils/index.html')

let loaders = [
  {
    loader: 'html-loader'
  },
  {
    loader: 'markdown-loader',
    options: {
      gfm: true
    }
  }
]

module.exports = {
  mode: 'production',
  plugins: [
    extractChangelog,
    extractUtils
  ],

  entry: {
    docs: path.resolve(__dirname + '/../../src/moduleDocs.js')
  },


  output: {
    filename: '[name].js',
    path: path.resolve(__dirname + '/../../dist/docs')
  },
  
  module: {
    rules: [
      {
        test: /\.md$/,
        include: path.resolve(__dirname + '/../../node_modules/styleguide'),
        exclude: path.resolve(__dirname + '/../../node_modules/styleguide/docs'),
        use: extractChangelog.extract({
          use: loaders
        })
      },
      {
        test: /\.md$/,
        include: path.resolve(__dirname + '/../../node_modules/styleguide/docs/utils'),
        use: extractUtils.extract({
          use: loaders
        })
      },
    ]
  }
}
