<template>
  <div>
    <h5 class="is-size-5">HTML</h5>
    <pre v-highlightjs="template"><code class="language-html"></code></pre>
    <button class="button is-info margin-top" @click="copy(template)">
      <span class="icon">
        <i class="fas fa-copy"></i>
      </span>
      <span>Copy</span>
    </button>
  </div>
</template>

<script>
  import copyToClipboardMixin from '../../mixins/copyToClipboard'
  import shared from './shared'
  import * as beautify from 'js-beautify'

  export default {
    name: 'html-section',

    mixins: [copyToClipboardMixin, shared],

    data() {
      return {
        regexToFindNewLines: /^(?:[\t ]*(?:\r?\n|\r))+/gm
      }
    },

    computed: {
      template() {
        const templateWithoutNewLines = this.patternVariantData.template.replace(this.regexToFindNewLines, '')
        const templateWithCorrectIndenting = beautify.html(templateWithoutNewLines)

        return templateWithCorrectIndenting
      }
    }
  }
</script>
