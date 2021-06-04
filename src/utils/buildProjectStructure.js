import { projectStructure } from './projectStructure.js'
import glob from 'glob'
import fs from 'fs'
import styleguide from '../styleguide.json'

let time = new Date().getTime()

let project = projectStructure(
  glob.sync(styleguide.internal.project_path + '**/*', { follow: true })
)

fs.writeFileSync('./build/projectStructure.json', JSON.stringify(project))

console.log("projectStructure build time: " + (new Date().getTime() - time) + "ms")
