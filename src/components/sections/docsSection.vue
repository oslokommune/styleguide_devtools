<template>
  <div class="osg-color-bg-yellow osg-padding-4 osg-margin-bottom-4">
    <article
      v-if="$store.state.pattern.sections.docs.sections.documentation.visible && pattern.mdFile"
      class="osg-content"      
      v-html="marked(pattern.mdFile.contents)"
    >
    </article>
    <div v-if="$store.state.pattern.sections.docs.sections.documentation.visible && !pattern.mdFile" class="notification osg-margin-vertical-3">
      This component is undocumented.
    </div>
    <aside class="osg-margin-top-3" v-if="$store.state.pattern.sections.docs.sections.assets.visible && rest()">
      <p class="osg-heading-6 osg-padding-bottom-1">Assets</p>
      <div
        v-for="file in pattern.cssFiles"
        v-bind:key="file.name"
        @click="copy(file.rawPath.replace(patternPath, ''))"
      >
        <button
          class="button is-tag is-small osg-color-bg-blue"
          title="Click to copy path to clipboard"
        >
          CSS
        </button>
        {{ file.rawPath.replace(patternPath, '') }}
      </div>
      <div
        v-for="file in pattern.jsFiles"
        v-bind:key="file.name"
        @click="copy(file.rawPath.replace(patternPath, ''))"
      >
        <button
          class="button is-tag is-small osg-color-bg-green-light"
          title="Click to copy path to clipboard"
        >
          JS
        </button>
        {{ file.rawPath.replace(patternPath, '') }}
      </div>

      <div
        v-if="pattern.jsFiles.length <= 0 && pattern.cssFiles.length <= 0"
        class="notification osg-color-bg-yellow"
      >
        There are no CSS or JS assets for this pattern.
      </div>
    </aside>
  </div>
</template>

<script>
  import marked from 'marked'
  import shared from './shared.js'

  export default {
    name: 'docs-section',

    mixins: [shared],

    methods: {
      marked(md) {
        return marked(md, {gfm: true})
      },

      rest() {
        return false
      }
    }
  }
</script>
