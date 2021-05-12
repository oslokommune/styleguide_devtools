<template>
  <div v-if="$store.state.component.sections.docs.visible" class="osg-row">
    <div class="osg-row__column">
      <div class="osg-color-bg-yellow osg-padding-4">
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
