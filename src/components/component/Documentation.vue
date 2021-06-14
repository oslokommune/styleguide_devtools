<template>
  <div class="osg-devtools-documentation">
    <article
      v-if="component.documentation"
      class="osg-content"      
      v-html="marked(component.documentation)"
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
    marked(documentation) {
      return marked(documentation, {gfm: true})
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
  max-height: calc(100vh - 218px);
  overflow: auto
}
</style>
