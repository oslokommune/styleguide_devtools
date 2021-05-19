import { componentStructure } from './componentStructure.js'
import glob from 'glob'
import fs from 'fs'
import dotenv from 'dotenv'

let time = new Date().getTime()

dotenv.config()

let componentStruc = componentStructure(
  glob.sync(process.env.COMPONENTS_PATH + '**/*', { follow: true })
)

fs.writeFileSync('./build/componentStructure.json', JSON.stringify(componentStruc))

console.log("componentStructure build time: " + (new Date().getTime() - time) + "ms")
