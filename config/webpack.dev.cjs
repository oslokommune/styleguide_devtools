const { merge } = require('webpack-merge')
const { exec } = require('child_process');
const chokidar = require('chokidar');
const common = require('./webpack.common.cjs')
const path = require('path')
const styleguide = require('../src/styleguide.json')
const webpack = require('webpack')

chokidar.watch(styleguide.internal.project_path + '**/*', {
  followSymlinks: true,
  ignoreInitial: true
}).on('all', (event, path) => {
  let infoTerminalText = '\x1b[46m'
  let redTerminalText = '\x1b[31m'
  let resetTerminalColor = '\x1b[0m'
  let styleguidePath = styleguide.internal.project_path.replace('./', '')

  console.log("\n\n\n" + infoTerminalText + event.toUpperCase() + ": " + path.replace(styleguidePath, '') + resetTerminalColor + "\n")

  let extension = path.substring(path.lastIndexOf('.') + 1)
  if (event === 'addDir' || event === 'unlinkDir' || styleguide.internal.projectStructureFormats.indexOf(extension) !== -1) {
    let cmd = 'yarn run build-structure'
    if (styleguide.internal.buildJsFormats.indexOf(extension) !== -1) {
      cmd = 'yarn run build'
    }
    exec(cmd, (error, stdout, stderr) => {
      let formattedOutput = stdout.replace('ERROR', `${redTerminalText}ERROR`) + resetTerminalColor
      console.log(formattedOutput)
    })
  }
});

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  cache: true,
  optimization: {
    runtimeChunk: true
  },
  infrastructureLogging: {
    appendOnly: true,
    level: 'warn',
    colors: true
  },
  stats: 'minimal'
})

module.exports.devServer = {
  host: '0.0.0.0',
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
