<template>
  <div>
    <h5 class="osg-u-heading-4">HTML</h5>
    <pre v-highlightjs="template"><code class="language-html"></code></pre>
    <button class="osg-button osg-button--yellow osg-u-margin-top-3" @click="copy(template)">
      <span class="icon">
        <i class="fas fa-copy"></i>
      </span>
      <span class="osg-u-text-4">Copy</span>
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

    data: () => ({
      regexToFindNewLines: /^(?:[\t ]*(?:\r?\n|\r))+/gm
    }),

    computed: {
      template() {
        const templateWithoutNewLines = this.patternVariantData.template.replace(this.regexToFindNewLines, '')
        const templateWithCorrectIndenting = beautify.html(templateWithoutNewLines)

        return templateWithCorrectIndenting
      }
    }
  }
</script>
