import fs from 'fs'
import styleguide from '../styleguide.json'

export function fileObject(path) {
  let projectPath = path.replace(styleguide.internal.project_path, '')
  return {
    name: getName(projectPath),
    baseName: getBaseName(projectPath),
    path: getPath(projectPath),
    extension: getExtension(projectPath),
    urlPath: projectPath.replace(/-/g, '__').replace(/\//g, '-'),
    rawPath: path,
    isFolder: isFolder(projectPath),
    isFile: isFile(projectPath),
    contents: getContents(path)
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
  return path.substring(0, path.lastIndexOf('/'))
}

function isFolder(path) {
  return path.substring(1).indexOf('.') === -1
}

function isFile(path) {
  return path.substring(1).indexOf('.') >= 0
}

function getExtension(path) {
  if (path.lastIndexOf('.') !== -1) {
    return path.substring(path.lastIndexOf('.') + 1)
  }
  return null
}

function getContents(path) {
  if (isFile(path)) {
    return fs.readFileSync(path).toString().trim()
  }
  return null
}
