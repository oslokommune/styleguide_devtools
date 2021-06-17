<template>
  <div class="osg-devtools-javascript">
    <h5 class="osg-heading-5 osg-margin-bottom-10">File</h5>
    <p class="osg-margin-bottom-30">{{ file }}</p>
    <h5 class="osg-heading-5 osg-margin-bottom-10">Code</h5>
    <pre v-if="javascript"><code v-html="javascript"></code></pre>
    <div v-else>
      No javascript available.
    </div>
  </div>
</template>
<script>
import Prism from 'prismjs'

export default {
  name: "Javascript",

  props: {
    component: {
      type: Object,
      required: true
    }
  },

  computed: {
    file() {
      if (this.component.js && this.component.js[0]) {
        return this.component.js[0].path + '/' + this.component.js[0].name
      }
      return null
    },

    javascript() {
      if (this.component.js && this.component.js[0]) {
        return Prism.highlight(this.component.js[0].contents, Prism.languages.javascript, 'javascript')
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
@use "system/colors";
@use "system/spacing";

code {
  width: 100%;
}

.osg-devtools-javascript {
  @extend %osg-padding-top-30;
  border-top: 2px solid colors.$gray;
  max-height: calc(100vh - 190px);
  overflow: auto;
}
</style>
