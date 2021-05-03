<template>
  <div v-if="$store.state.component.sections.docs.visible" class="osg-color-bg-yellow osg-padding-4 osg-margin-bottom-4">
    <div class="columns">
      <div class="column">
        <article
          v-if="component.mdFile"
          class="osg-content"      
          v-html="marked(component.mdFile.contents)"
        >
        </article>
        <div v-else>
          This component is undocumented.
        </div>
      </div>
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
