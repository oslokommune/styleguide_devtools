<template>
  <div>
    <h5 class="osg-u-heading-4">JSON</h5>
    <pre v-highlightjs="mergedDataString"><code class="language-json"></code></pre>
  </div>
</template>

<script>
  import shared from './shared'

  export default {
    name: 'json-section',

    mixins: [shared]
  }
</script>
