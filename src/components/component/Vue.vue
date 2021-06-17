<template>
  <div class="osg-devtools-vue">
    <h5 class="osg-heading-5 osg-margin-bottom-2">File</h5>
    <p class="osg-margin-bottom-4">{{ file }}</p>
    <h5 class="osg-heading-5 osg-margin-bottom-2">Code</h5>
    <pre v-if="vue"><code v-html="vue"></code></pre>
    <div v-else>
      No vue component available.
    </div>
  </div>
</template>
<script>
import Prism from 'prismjs'

export default {
  name: "Vue",

  props: {
    component: {
      type: Object,
      required: true
    }
  },

  computed: {
    file() {
      if (this.component.vue && this.component.vue[0]) {
        return this.component.vue[0].path + '/' + this.component.vue[0].name
      }
      return null
    },

    vue() {
      if (this.component.vue && this.component.vue[0]) {
        return Prism.highlight(this.component.vue[0].contents, Prism.languages.html, 'html')
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

.osg-devtools-vue {
  @extend %osg-padding-top-4;
  border-top: 2px solid colors.$gray;
  max-height: calc(100vh - 190px);
  overflow: auto;
}
</style>
