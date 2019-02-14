<template>
  <div>
    <h5 class="is-size-5">Twig</h5>
    <pre v-highlightjs="twigFile.contents"><code class="language-twig"></code></pre>
    <h3 class="is-size-5 margin-top">Include</h3>
    <pre v-highlightjs="'{% include \'' + twigFile.rawPath.replace(patternPath, '') + '\' with ' + mergedDataString + ' only %}'"><code class="language-json"></code></pre>
    <button class="button is-info margin-top"
            @click="copy('{% include \'' + twigFile.rawPath.replace(patternPath, '') + '\' with ' + mergedDataString + ' only %}')">
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
    name: 'twig-section',

    mixins: [copyToClipboardMixin, shared]
  }
</script>
