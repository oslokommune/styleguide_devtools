import _ from 'lodash'
import { variantSeparator } from '../../utils/config'

export default {
  props: {
    pattern: {
      type: Object,
      required: true
    },
    activeVariant: {
      type: String,
      required: true
    }
  },

  computed: {
    patternVariantNames() {
      return this.pattern.variants.map(item => {
        if (item.name.indexOf(variantSeparator) > 0) {
          return item.name.substring(item.name.indexOf(variantSeparator) + 1, item.name.lastIndexOf('.'))
        }
        return 'default'
      }).reverse()
    },

    patternVariantData() {
      let data = {
        template: '',
        contents: '{}'
      }
      for (let variant of this.pattern.variants) {
        let variantName = variant.name.substring(
          variant.name.indexOf(variantSeparator) + 1,
          variant.name.lastIndexOf('.')
        )
        if (variantName === this.activeVariant) {
          data.template = variant.template
          data.contents = variant.contents
          break
        }
        if (variant.name.indexOf(variantSeparator) < 0) {
          data.template = variant.template
          data.contents = variant.contents
        }
      }

      if (this.pattern.groups) {
        let component = data.template
        data.template = ''
        this.pattern.groups.forEach((group, index) => {
          data.template += '<h2 class="osg-u-heading-4 ' + (index > 0 ? 'osg-u-margin-top-5 ' : '') + 'osg-u-margin-bottom-1">' + group.title + '</h2><div class="osg-container">\n'

          group.items.forEach(item => {
            const regex = /class="(osg-[a-z0-9-]*)/
            const replaceText = `class="$1${item.class ? ' ' + item.class : ''}`
            let componentData = component.replace(regex, replaceText)
            let dataContents = JSON.parse(data.contents)
            if (item.content) {
              componentData = componentData.replace(dataContents.component.content, item.content)
            }
            if (item.attrs) {
              let newAttrs = item.attrs.map(item => {
                return item.key + '="' + item.val + '"'
              })
              componentData = componentData.replace(/>/, newAttrs.join(' ') + '>')
            }

            data.template += componentData + ' \n'
          })

          data.template += '</div>\n'
        })
      }

      return data
    },

    mergedData() {
      let variantJson = JSON.parse(this.patternVariantData.contents)
      if (this.activeVariant !== 'default') {
        let variantData = _.cloneDeep(variantJson)
        let defaultData = _.cloneDeep(this.defaultData)
        variantJson = _.merge(defaultData, variantData)
      }

      return variantJson
    },

    mergedDataString() {
      let mergedData = Object.assign({}, this.mergedData)
      if (mergedData.devtools) {
        delete mergedData.devtools
      }
      return typeof mergedData === 'object' ? JSON.stringify(mergedData, undefined, 2) : mergedData
    },

    defaultData() {
      for (let variant of this.pattern.variants) {
        if (variant.name.indexOf(variantSeparator) < 0) {
          return _.cloneDeep(JSON.parse(variant.contents))
        }
      }
      return {}
    },

    twigFile() {
      for (let file of this.pattern.files) {
        if (file.extension === 'twig') {
          return file
        }
      }

      return null
    },

    patternPath() {
      return process.env.COMPONENTS_PATH // eslint-disable-line
    }
  }
}
