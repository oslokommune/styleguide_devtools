import {atomicStructure} from './atomicStructure'
import glob from 'glob'
import fs from 'fs'
import dotenv from 'dotenv'
import {variantSeparator} from './config'

let time = new Date().getTime()

dotenv.config()

function getVariantName(variant) {
  let atomicVariant = variant.replace(process.env.AD_PATTERN_PATH, '')
  let separatorPos = atomicVariant.indexOf(variantSeparator)
  if (separatorPos >= 0) {
    return atomicVariant.substring((separatorPos + 1), atomicVariant.lastIndexOf('.'))
  }
  return null
}

let atomicStruc = atomicStructure(
  glob.sync(process.env.AD_PATTERN_PATH + '**/*', {follow: true})
)

let cssFiles = ''
let jsFiles = "import './modules.sass'\n"
for (let file of atomicStruc.assets) {
  if (file.substring(file.lastIndexOf('/') + 1).substring(0, 1) !== variantSeparator) {
    switch (file.substring(file.lastIndexOf('.') + 1)) {
      case 'sass':
        cssFiles += "@import '../" + file + "'\n"
        break
      case 'js':
        jsFiles += "import '../" + file + "'\n"
        break
    }
  }

}

let templatesData = []
for (let template of atomicStruc.templates) {
  for (let variant of template.variants) {
    let dest = template.src.replace(process.env.AD_PATTERN_PATH, '').replace(/twig/, 'html')
    let variantName = getVariantName(variant)
    if (variantName !== null) {
      dest = dest.replace(/.html/, variantSeparator + variantName + '.html')
    }
    templatesData.push({
      src: template.src.replace(process.env.AD_PATTERN_PATH, ''),
      data: variant.replace(process.env.AD_PATTERN_PATH, ''),
      dest: dest
    })
  }
}

fs.writeFileSync('./build/twig.json', JSON.stringify(templatesData))
fs.writeFileSync('./build/modules.sass', cssFiles)
fs.writeFileSync('./build/modules.js', jsFiles)

if (process.argv[2] === 'true') {
  fs.writeFileSync('./build/atomicStructure.json', JSON.stringify(atomicStruc))
}

console.log("atomicStructure build time: " + (new Date().getTime() - time) + "ms")
