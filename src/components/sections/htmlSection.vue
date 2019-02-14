<template>
  <div>
    <h5 class="is-size-5">HTML</h5>
    <pre v-highlightjs="patternVariantData.template"><code class="language-html"></code></pre>
    <button class="button is-info margin-top" @click="copy(patternVariantData.template)">
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

  export default {
    name: 'html-section',

    mixins: [copyToClipboardMixin, shared]
  }
</script>
