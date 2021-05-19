import componentStructure from '../../../build/componentStructure.json'

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

export function componentInfo(path) {
  let componentData = {
    name: 'Untitled',
    cssFiles: [],
    jsFiles: [],
    mdFile: null,
    template: null,
    data: {}
  }

  let node = null
  let pathParts = path.split('-')
  switch (pathParts[0]) {
    case 'components':
      node = findNode(path, componentStructure.components.children)
      break
    case 'general':
      node = findNode(path, componentStructure.general.children)
      break
    case 'getting_started':
      node = findNode(path, componentStructure.gettingStarted.children)
      break
    case 'pages':
      node = findNode(path, componentStructure.pages.children)
      break
    default:
  }

  if (node !== null) {
    componentData.name = node.name
    for (let file of node.children) {
      let contents
      switch (file.extension) {
        case 'css':
        case 'scss':
          componentData.cssFiles.push(file)
          break
        case 'js':
          componentData.jsFiles.push(file)
          break
        case 'md':
          componentData.mdFile = file
          break
        case 'html':
          componentData.template = file.contents
          break
        case 'json':
          contents = JSON.parse(file.contents)
          if (contents && contents.devtools) {
            componentData.data = contents.devtools
          }
          break
        default:
      }
    }
  }

  componentData.name = componentData.name.replace(/_/g, ' ')

  return componentData
}
