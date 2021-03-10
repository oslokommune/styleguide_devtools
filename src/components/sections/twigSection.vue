<template>
  <div>
    <h3 class="osg-u-heading-4 margin-top">Twig include</h3>
    <pre v-highlightjs="'{% include \'' + twigFile.rawPath.replace(patternPath, '') + '\' with ' + mergedDataString + ' only %}'"><code class="language-json"></code></pre>
    <button class="osg-button osg-button--yellow osg-u-margin-top-3"
            @click="copy('{% include \'' + twigFile.rawPath.replace(patternPath, '') + '\' with ' + mergedDataString + ' only %}')">
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

  export default {
    name: 'twig-section',

    mixins: [copyToClipboardMixin, shared]
  }
</script>
