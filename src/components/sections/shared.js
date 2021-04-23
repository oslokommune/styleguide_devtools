import _ from 'lodash'
import { variantSeparator } from '../../utils/config.js'

export default {
  props: {
    pattern: {
      type: Object,
      required: true
    }
  },

  computed: {
    patternVariantData() {
      let data = {
        template: '',
        contents: '{}'
      }
      if (this.pattern.variants[0]) {
        data.template = this.pattern.variants[0].template
        data.contents = this.pattern.variants[0].contents
      }

      return data
    },

    mergedData() {
      return JSON.parse(this.patternVariantData.contents)
    },

    defaultData() {
      for (let variant of this.pattern.variants) {
        if (variant.name.indexOf(variantSeparator) < 0) {
          return _.cloneDeep(JSON.parse(variant.contents))
        }
      }
      return {}
    },

    patternPath() {
      return process.env.COMPONENTS_PATH // eslint-disable-line
    }
  }
}
