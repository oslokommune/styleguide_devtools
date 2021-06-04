import { fileObject } from './fileObject.js'
import styleguide from '../styleguide.json'

const nestedStructureList = {}

export function projectStructure(fileList) {
  let projectFiles = []
  fileList.forEach(function (item, index) {
    let itemObj = fileObject(item)
    if (styleguide.internal.projectStructureFormats.indexOf(itemObj.extension) !== -1 || itemObj.isFolder) {
      projectFiles.push(itemObj)
    }
  })

  nestFiles(projectFiles)

  return nestedStructureList
}

/**
 * Build trees
 */
function nestFiles(projectFiles) {
  for (let item of styleguide.nav) {
    nestedStructureList[item] = {
      children: []
    }
    nest(projectFiles, nestedStructureList[item].children, item + '-', 1)
  }
}

/**
 * Recursive tree function
 * @param files
 * @param container
 * @param path
 * @param level
 */
function nest(files, container, path, level) {
  for (let file of files) {
    if (file.urlPath.includes(path) && (file.urlPath.match(/-/g) || []).length === level) {
      if (file.isFolder) {
        file.children = []
        nest(files, file.children, path + file.name + '-', level + 1)
      }
      container.push(file)
    }
  }
}
