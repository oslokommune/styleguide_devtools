import styleguide from '../../styleguide.json'

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

export function componentInfo(projectStructure, path) {
  let componentData = {
    name: 'Untitled',
    js: [],
    vue: [],
    documentation: null,
    template: null,
    config: {}
  }

  let node = null
  for (let nav of styleguide.nav) {
    node = findNode(path, projectStructure[nav].children)
    if (node) {
      break
    }
  }
  if (node !== null) {
    componentData.name = node.name
    for (let file of node.children) {
      switch (file.extension) {
        case 'js':
          componentData.js.push(file)
          break
        case 'vue':
          componentData.vue.push(file)
          break
        case styleguide.internal.documentationFormat:
          componentData.documentation = file.contents
          break
        case styleguide.internal.templateFormat:
          componentData.template = file.contents
          break
        case styleguide.internal.configFormat:
          componentData.config = JSON.parse(file.contents)
          break
        default:
      }
    }
  }

  componentData.name = componentData.name.replace(/_/g, ' ')

  return componentData
}
