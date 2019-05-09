var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

/*
// to transpile more files into separate html files
// one needs to add separate extractPlugin instance
// for each file and add separate rules for them
*/
const extractChangelog = new ExtractTextPlugin('changelog/index.html')

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
      }
    ]
  }
}
