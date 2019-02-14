<template>
  <div>
    <h5 class="is-size-5">JSON</h5>
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
