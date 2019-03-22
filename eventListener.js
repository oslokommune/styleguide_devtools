import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'

let lockFile = path.resolve(__dirname + '/eventListener.lock')
let rebuildFile = path.resolve(__dirname + '/eventListener.rebuild')

fs.access(lockFile, fs.constants.F_OK | fs.constants.W_OK, (aerr) => {
  if (aerr) {
    fs.writeFile(lockFile, 'Rebuilding...', (werr) => {
      if (werr) {
        console.log('Error: Could not write lock file...')
      } else {
        build()
      }
    })
  } else {
    fs.access(rebuildFile, fs.constants.F_OK | fs.constants.W_OK, (rerr) => {
      if (rerr) {
        fs.writeFile(rebuildFile, 'event...', (werr) => {
          if (werr) {
            console.log('Error: Could not write rebuild file...')
          } else {
            console.log('Skipping build... queueing a rebuild...')
          }
        })
      } else {
        console.log('Skipping build... already rebuilding...')
      }
    })
  }
})

function build() {
  let file = process.argv[3]
  let extension = ''
  if (file) {
    extension = file.substring(file.lastIndexOf('.') + 1)
  }

  let cmd = 'npm run dev'
  switch (extension) {
    case 'md':
      cmd = 'npm run build-structure true'
      break
    default:
      cmd = 'npm run dev'
  }

  exec(cmd, (error, stdout, stderr) => {
    // logging command output
    console.log(stdout)
  })

  fs.access(rebuildFile, fs.constants.F_OK | fs.constants.W_OK, (rerr) => {
    if (!rerr) {
      fs.unlink(rebuildFile, (uerr) => {
        if (uerr) {
          console.log('Unable to remove rebuild file')
        } else {
          build()
        }
      })
    }
  })

  fs.unlink(lockFile, (lerr) => {
    if (lerr) {
      console.log('Unable to remove lock file')
    }
  })
}