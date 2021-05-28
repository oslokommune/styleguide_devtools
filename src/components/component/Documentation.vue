<template>
  <div class="osg-devtools-documentation">
    <article
      v-if="component.mdFile"
      class="osg-content"      
      v-html="marked(component.mdFile.contents)"
    >
    </article>
    <div v-else>
      No documentation available.
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'docs-section',

  props: {
    component: {
      type: Object,
      required: true
    }
  },

  methods: {
    marked(md) {
      return marked(md, {gfm: true})
    }
  }
}
</script>

<style lang="scss" scoped>
@use "system/colors";
@use "system/spacing";

.osg-devtools-documentation {
  @extend %osg-padding-4;
  border-top: 2px solid colors.$gray;
}
</style>
