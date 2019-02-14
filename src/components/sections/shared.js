import _ from 'lodash'
import {variantSeparator} from '../../utils/config'

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

      return data
    },

    mergedData() {
      let variantJson = JSON.parse(this.patternVariantData.contents)
      if (this.activeVariant !== 'default') {
        let variantData = _.cloneDeep(variantJson)
        let defaultData = _.cloneDeep(this.defaultData)
        variantJson = _.merge(defaultData, variantData)
      }

      if (!variantJson.meta || !variantJson.meta.tags) {
        this.warnMsg = 'There are no tags associated with this pattern,' +
                       'this makes it harder to find, think about adding some!'
      } else {
        this.warnMsg = ''
      }

      return variantJson
    },

    mergedDataString() {
      let mergedData = Object.assign({}, this.mergedData)
      if (mergedData.meta) {
        delete mergedData.meta
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
      return process.env.AD_PATTERN_PATH // eslint-disable-line
    }
  }
}
