import {fileObject} from './fileObject'

/**
 * Atomic Object
 * @type {{atoms: {children: Array, unprocessedHits: Array}, molecules: {children: Array, unprocessedHits: Array}, organisms: {children: Array, unprocessedHits: Array}, assets: Array, templates: Array}}
 */
const nestedStructureList = {
  atoms: {
    children: [],
    unprocessedHits: []
  },
  molecules: {
    children: [],
    unprocessedHits: []
  },
  organisms: {
    children: [],
    unprocessedHits: []
  },
  globals: {
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
 * @returns {{atoms: {children: Array, unprocessedHits: Array}, molecules: {children: Array, unprocessedHits: Array}, organisms: {children: Array, unprocessedHits: Array}, globals: {children: Array, unprocessedHits: Array}, assets: Array, templates: Array}}
 */
export function atomicStructure(fileList) {
  fileList.forEach(function (item, index) {
    let itemObj = fileObject(item)
    if (itemObj.isAsset && itemObj.extension === 'sass') {
      nestedStructureList.assets.push(item)
    }
    if (itemObj.extension === 'sass' || itemObj.extension === 'js' || itemObj.extension === 'md' || itemObj.extension === 'json' || itemObj.extension === 'twig' || itemObj.isFolder) {
      fileList[index] = itemObj
    }
  })

  organizeFiles(fileList)
  nestFiles()

  findAssetsAndTemplates(nestedStructureList.atoms.children)
  findAssetsAndTemplates(nestedStructureList.molecules.children)
  findAssetsAndTemplates(nestedStructureList.organisms.children)
  findAssetsAndTemplates(nestedStructureList.globals.children)
  findAssetsAndTemplates(nestedStructureList.gettingStarted.children)

  nestedStructureList.atoms.unprocessedHits = []
  nestedStructureList.molecules.unprocessedHits = []
  nestedStructureList.organisms.unprocessedHits = []
  nestedStructureList.globals.unprocessedHits = []
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
      case 'js':
        nestedStructureList.assets.push(child.rawPath)
        break
      case 'twig':
        template.src = child.rawPath
        break
      case 'json':
        template.variants.push(child.rawPath)
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
    if (file.isAtom) {
      nestedStructureList.atoms.unprocessedHits.push(file)
    } else if (file.isMolecule) {
      nestedStructureList.molecules.unprocessedHits.push(file)
    } else if (file.isOrganism) {
      nestedStructureList.organisms.unprocessedHits.push(file)
    } else if (file.isGlobal) {
      nestedStructureList.globals.unprocessedHits.push(file)
    } else if (file.isGettingStarted) {
      nestedStructureList.gettingStarted.unprocessedHits.push(file)
    }
  }
}

/**
 * Build trees
 */
function nestFiles() {
  nest(nestedStructureList.atoms.unprocessedHits, nestedStructureList.atoms.children, 'atoms-', 1)
  nest(nestedStructureList.molecules.unprocessedHits, nestedStructureList.molecules.children, 'molecules-', 1)
  nest(nestedStructureList.organisms.unprocessedHits, nestedStructureList.organisms.children, 'organisms-', 1)
  nest(nestedStructureList.globals.unprocessedHits, nestedStructureList.globals.children, 'globals-', 1)
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
    if (hit.urlPath.includes(path) && (hit.urlPath.match(/-/g) || []).length === level) {
      if (hit.isFolder) {
        hit.children = []
        nest(hits, hit.children, path + hit.name + '-', level + 1)
      }

      container.push(hit)
    }
  }
}
