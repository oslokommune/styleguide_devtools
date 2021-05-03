import { fileObject } from './fileObject.js'

/**
 * Atomic Object
 * @type {{components: {children: Array, unprocessedHits: Array}, assets: Array, templates: Array}}
 */
const nestedStructureList = {
  components: {
    children: [],
    unprocessedHits: []
  },
  general: {
    children: [],
    unprocessedHits: []
  },
  gettingStarted: {
    children: [],
    unprocessedHits: []
  },
  assets: [],
  templates: []
}

/**
 * Populate the atomic object
 * @param fileList
 * @returns {{components: {children: Array, unprocessedHits: Array}, general: {children: Array, unprocessedHits: Array}, assets: Array, templates: Array}}
 */
export function componentStructure(fileList) {
  fileList.forEach(function (item, index) {
    let itemObj = fileObject(item)
    if (itemObj.isAsset && itemObj.extension === 'scss') {
      nestedStructureList.assets.push(item)
    }
    if (itemObj.extension === 'scss' || itemObj.extension === 'js' || itemObj.extension === 'md' || itemObj.extension === 'json' || itemObj.extension === 'html' || itemObj.isFolder) {
      fileList[index] = itemObj
    }
  })

  organizeFiles(fileList)
  nestFiles()

  findAssetsAndTemplates(nestedStructureList.components.children)
  findAssetsAndTemplates(nestedStructureList.general.children)
  findAssetsAndTemplates(nestedStructureList.gettingStarted.children)

  nestedStructureList.components.unprocessedHits = []
  nestedStructureList.general.unprocessedHits = []
  nestedStructureList.gettingStarted.unprocessedHits = []

  return nestedStructureList
}

/**
 * Categorize content
 * @param children
 */
function findAssetsAndTemplates(children) {
  let template = {
    src: '',
    variants: []
  }
  for (let child of children) {
    if (child.children && child.children.length) {
      findAssetsAndTemplates(child.children)
    }

    switch (child.extension) {
      case 'sass':
      case 'scss':
      case 'js':
        nestedStructureList.assets.push(child.rawPath)
        break
      case 'html':
        template.src = child.rawPath
        break
      case 'json':
        template.data = child.rawPath
        break
    }
  }
  nestedStructureList.templates.push(template)
}

/**
 * Organize patterns
 * @param fileList
 */
function organizeFiles(fileList) {
  for (let file of fileList) {
    if (file.isComponent) {
      nestedStructureList.components.unprocessedHits.push(file)
    } else if (file.isGlobal) {
      nestedStructureList.general.unprocessedHits.push(file)
    } else if (file.isGettingStarted) {
      nestedStructureList.gettingStarted.unprocessedHits.push(file)
    }
  }
}

/**
 * Build trees
 */
function nestFiles() {
  nest(nestedStructureList.components.unprocessedHits, nestedStructureList.components.children, 'components-', 1)
  nest(nestedStructureList.general.unprocessedHits, nestedStructureList.general.children, 'general-', 1)
  nest(nestedStructureList.gettingStarted.unprocessedHits, nestedStructureList.gettingStarted.children, 'getting_started-', 1)
}

/**
 * Recursive tree function
 * @param hits
 * @param container
 * @param path
 * @param level
 */
function nest(hits, container, path, level) {
  for (let hit of hits) {
    if (hit.urlPath.includes(path) && (hit.urlPath.match(/-/g) || []).length === level) {
      if (hit.isFolder) {
        hit.children = []
        nest(hits, hit.children, path + hit.name + '-', level + 1)
      }

      container.push(hit)
    }
  }
}
