import componentStructure from '../../../build/componentStructure.json'

const treeSize = countNodes(componentStructure.components.children)

let currentNodeIndex = 0
export function randomNode() {
  currentNodeIndex = 0
  return getNode(
    componentStructure.components.children,
    parseInt(Math.random() * treeSize, 10)
  )
}

export function patternInfo(path) {
  let patternData = {
    name: 'Untitled',
    files: [],
    cssFiles: [],
    jsFiles: [],
    mdFile: null,
    variants: [],
    groups: []
  }

  let node = null
  let pathParts = path.split('-')
  switch (pathParts[0]) {
    case 'components':
      node = findNode(path, componentStructure.components.children)
      break
    case 'globals':
      node = findNode(path, componentStructure.globals.children)
      break
    case 'getting_started':
      node = findNode(path, componentStructure.gettingStarted.children)
      break
    default:
  }

  if (node !== null) {
    patternData.name = node.name
    for (let file of node.children) {
      let contents
      switch (file.extension) {
        case 'css':
        case 'scss':
        case 'sass':
          patternData.cssFiles.push(file)
          break
        case 'js':
          patternData.jsFiles.push(file)
          break
        case 'md':
          patternData.mdFile = file
          break
        case 'json':
          // Parse groups
          contents = JSON.parse(file.contents)
          if (contents && contents.devtools && contents.devtools.groups) {
            patternData.groups = [...contents.devtools.groups]
          }

          patternData.variants.push(file)
          break
        default:
      }

      patternData.files.push(file)
    }
  }

  patternData.name = patternData.name.replace(/_/g, ' ')

  return patternData
}

function findNode(path, children) {
  let node = null
  for (let child of children) {
    if (child.isFolder) {
      if (child.urlPath === path) {
        node = child
      } else {
        node = findNode(path, child.children)
      }
    }

    if (node !== null) {
      break
    }
  }

  return node
}

function getNode(children, index) {
  let node = null
  for (let child of children) {
    if (child.extension === 'json') {
      if (currentNodeIndex === index) {
        node = child
        break
      }
      currentNodeIndex++
    }
    if (child.children && child.children.length) {
      node = getNode(child.children, index)
      if (node) {
        break
      }
    }
  }
  return node
}

function countNodes(children) {
  let nodeCount = 0
  for (let child of children) {
    if (child.children && child.children.length) {
      nodeCount += countNodes(child.children)
    }
    if (child.extension === 'json') {
      nodeCount++
    }
  }
  return nodeCount
}
