<template>
  <div>
    <article
      v-if="$store.state.pattern.sections.docs.sections.documentation.visible && pattern.mdFile"
      id="markdown-body"
      class="markdown-body"
      :style="[
        { backgroundColor: $store.state.pattern.sections.docs.backgroundColor },
        { padding: $store.state.pattern.sections.docs.padding ? '2em' : '0' }
      ]"
      v-html="marked(pattern.mdFile.contents)"
    >
    </article>
    <div v-if="$store.state.pattern.sections.docs.sections.documentation.visible && !pattern.mdFile" class="notification osg-u-color-bg-yellow">
      There is no documentation available.
    </div>
    <aside v-if="$store.state.pattern.sections.docs.sections.assets.visible">
      <p class="osg-u-heading-6 osg-u-padding-bottom-1">Assets</p>
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
        class="notification osg-u-color-bg-yellow"
      >
        There are no CSS or JS assets for this pattern.
      </div>
    </aside>
  </div>
</template>

<script>
  import copyToClipboardMixin from '../../mixins/copyToClipboard'
  import marked from 'marked'
  import shared from './shared'
  import _ from 'lodash'

  export default {
    name: 'docs-section',

    mixins: [copyToClipboardMixin, shared],

    methods: {
      marked(md) {
        return marked(md, {gfm: true})
      }
    }
  }
</script>
