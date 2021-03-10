import fs from 'fs'
import { variantSeparator } from './config.js'
import dotenv from 'dotenv'
dotenv.config()

export function fileObject(path) {
  return {
    name: getName(path),
    baseName: getBaseName(path),
    path: getPath(path),
    extension: getExtension(path),
    urlPath: path.replace(process.env.COMPONENTS_PATH, '').replace(/-/g, '__').replace(/\//g, '-'),
    rawPath: path,
    isComponent: isComponent(path),
    isGlobal: isGlobal(path),
    isGettingStarted: isGettingStarted(path),
    isFolder: isFolder(path),
    isFile: isFile(path),
    isDataFile: isDataFile(path),
    isAsset: isAsset(path),
    isRoot: isRoot(path),
    contents: getContents(path),
    template: getTemplate(path)
  }
}

function getName(path) {
  return path.substring(path.lastIndexOf('/') + 1)
}

function getBaseName(path) {
  if (getName(path).indexOf('.') >= 0) {
    return getName(path).substring(0, getName(path).indexOf('.'))
  }

  return getName(path)
}

function getPath(path) {
  return path.substring(0, path.lastIndexOf('/')).
    replace(process.env.COMPONENTS_PATH, '').
    replace('components/', '').
    replace('globals/', '')
}

function isAsset(path) {
  return path.indexOf('assets') >= 0
}

function isComponent(path) {
  return path.indexOf('components') >= 0
}

function isGlobal(path) {
  return path.indexOf('globals') >= 0
}

function isGettingStarted(path) {
  return path.indexOf('getting_started') >= 0
}

function isFolder(path) {
  return path.substring(1).indexOf('.') === -1
}

function isFile(path) {
  return path.substring(1).indexOf('.') >= 0
}

function getExtension(path) {
  return path.substring(path.lastIndexOf('.') + 1)
}

function isDataFile(path) {
  return (isFile(path) && getExtension(path) === 'json' && getName(path).indexOf(variantSeparator) === -1)
}

function isRoot(path) {
  return path === process.env.COMPONENTS_PATH + 'components' || path === process.env.COMPONENTS_PATH + 'globals'
}

function getContents(path) {
  if (isFile(path)) {
    return fs.readFileSync(path).toString().trim()
  }
  return null
}

function getTemplate(path) {
  if (getExtension(path) === 'json' && isFile(path)) {
    let templateCache = path.replace(process.env.COMPONENTS_PATH, './dist/').replace(/json/, 'html')
    try {
      return fs.readFileSync(templateCache).toString().trim()
    } catch (err) { }
  }
  return null
}
