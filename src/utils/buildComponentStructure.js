import { componentStructure } from './componentStructure.js'
import glob from 'glob'
import fs from 'fs'
import dotenv from 'dotenv'

let time = new Date().getTime()

dotenv.config()

let componentStruc = componentStructure(
  glob.sync(process.env.COMPONENTS_PATH + '**/*', { follow: true })
)

let jsFiles = "import 'styleguide/src/_devtools.scss'\n"
for (let file of componentStruc.assets) {
  file = file.substring(2)
  switch (file.substring(file.lastIndexOf('.') + 1)) {
    case 'js':
      jsFiles += "import '../" + file + "'\n"
      break
  }
}

fs.writeFileSync('./build/modules.js', jsFiles)

if (process.argv[2] === 'true') {
  fs.writeFileSync('./build/componentStructure.json', JSON.stringify(componentStruc))
}

console.log("componentStructure build time: " + (new Date().getTime() - time) + "ms")
