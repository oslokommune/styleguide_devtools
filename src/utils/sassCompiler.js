let sass = require('node-sass')
let fs = require('fs')
sass.render({
  file: './build/modules.sass',
  includePaths: [
    './node_modules/',
  ]},
  function (error, result) {
    if (! error) {
      fs.writeFile('./dist/patterns.css', result.css, function(err) {
        if (! err) {
          //file written on disk
        }
      })
    } else {
      console.log(error.message)
    }
  }
)
