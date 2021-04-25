import { componentStructure } from './componentStructure.js'
import glob from 'glob'
import fs from 'fs'
import dotenv from 'dotenv'
import { variantSeparator } from './config.js'

let time = new Date().getTime()

dotenv.config()

function getVariantName(variant) {
  let componentVariant = variant.replace(process.env.COMPONENTS_PATH, '')
  let separatorPos = componentVariant.indexOf(variantSeparator)
  if (separatorPos >= 0) {
    return componentVariant.substring((separatorPos + 1), componentVariant.lastIndexOf('.'))
  }
  return null
}

let componentStruc = componentStructure(
  glob.sync(process.env.COMPONENTS_PATH + '**/*', { follow: true })
)

let cssFiles = ''
let jsFiles = "import 'styleguide/src/_devtools.scss'\n"
for (let file of componentStruc.assets) {
  if (file.substring(file.lastIndexOf('/') + 1).substring(0, 1) !== variantSeparator) {
    file = file.substring(2)
    switch (file.substring(file.lastIndexOf('.') + 1)) {
      case 'js':
        jsFiles += "import '../" + file + "'\n"
        break
    }
  }
}

fs.writeFileSync('./build/modules.scss', cssFiles)
fs.writeFileSync('./build/modules.js', jsFiles)

if (process.argv[2] === 'true') {
  fs.writeFileSync('./build/componentStructure.json', JSON.stringify(componentStruc))
}

console.log("componentStructure build time: " + (new Date().getTime() - time) + "ms")
