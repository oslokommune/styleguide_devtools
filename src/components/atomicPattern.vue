<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <h6>Developer tools for</h6>
        <h1 class="title">Patterns</h1>
      </div>
    </section>
    <div class="view">
      <div class="notification is-danger" v-for="(item, index) of errorMessages" :key="index">
        <i class="fas fa-exclamation-triangle"></i> {{ item.message }}
      </div>
      <div class="notification is-warning" v-for="(item, index) of warningMessages" :key="index">
        <i class="fas fa-exclamation-triangle"></i> {{ item.message }}
      </div>
      <view-box
        :pattern="pattern"
        :gui-preset="guiPreset"
        v-bind:active-variant.sync="activeVariant"
        v-bind:a11y-invalid.sync="a11yInvalid"
        v-bind:a11y-results.sync="a11yResults" />
      <div class="tab-content">
        <div v-if="tabsToShow !== [] && guiPreset !== 'global-pattern'" class="tabs">
          <ul>
            <li v-if="showTab('docs')" :class="activeTab === 'docs' ? 'is-active' : null">
              <a @click="activeTab = 'docs'">Docs</a>
            </li>
            <li v-if="showTab('a11y')" :class="activeTab === 'a11y' ? 'is-active' : null">
              <a @click="activeTab = 'a11y'">
                <span class="icon">
                  <i class="fas fa-check has-text-success" v-if="! a11yInvalid"></i>
                  <i class="fas fa-exclamation-triangle has-text-warning" v-if="a11yInvalid"></i>
                </span>
                <span>A11Y</span>
              </a>
            </li>
            <li v-if="showTab('html')" :class="activeTab === 'html' ? 'is-active' : null">
              <a @click="activeTab = 'html'">HTML</a>
            </li>
            <li v-if="showTab('twig')" :class="activeTab === 'twig' ? 'is-active' : null">
              <a @click="activeTab = 'twig'">Twig</a>
            </li>
            <li v-if="showTab('data')" :class="activeTab === 'data' ? 'is-active' : null">
              <a @click="activeTab = 'data'">Data</a>
            </li>
          </ul>
        </div>
        <docs-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="activeTab === 'docs'" :show-docs="showDocs" :show-includes="showIncludes" :show-assets="showAssets"></docs-section>
        <a11y-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="activeTab === 'a11y'" :a11yResults="a11yResults"></a11y-section>
        <html-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="activeTab === 'html'"></html-section>
        <twig-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="activeTab === 'twig'"></twig-section>
        <json-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="activeTab === 'data'"></json-section>
      </div>
    </div>
  </div>
</template>

<script>
  import {patternInfo} from '../assets/js/patternInfo'
  import ViewBox from './viewBox/viewBox'
  import DocsSection from './sections/docsSection'
  import HtmlSection from './sections/htmlSection'
  import TwigSection from './sections/twigSection'
  import JsonSection from './sections/jsonSection'
  import a11ySection from './sections/a11ySection'

  export default {
    name: 'atomicPattern',

    components: {
      JsonSection,
      HtmlSection,
      DocsSection,
      TwigSection,
      a11ySection,
      ViewBox
    },

    data: () => ({
      activeVariant: 'default',
      a11yInvalid: false,
      a11yResults: {},
      activeTab: 'docs',
      errorMessages: [],
      warningMessages: [],
      pattern: {
        name: 'Loading...',
        files: [],
        cssFiles: [],
        jsFiles: [],
        mdFile: null,
        variants: []
      }
    }),

    computed: {
      patternData() {
        const hasContents = (this.pattern && this.pattern.variants[0] && this.pattern.variants[0].contents)

        return hasContents ? JSON.parse(this.pattern.variants[0].contents) : undefined
      },

      patternMeta() {
        return (this.patternData && this.patternData.meta) ? this.patternData.meta : undefined
      },

      guiPreset() {
        const hasGuiPreset = (this.patternMeta && this.patternMeta['gui-preset'])

        return hasGuiPreset ? this.patternMeta['gui-preset'] : undefined
      },

      tabsToShow() {
        if (this.guiPreset === 'global-pattern') {
          return []
        }

        const hasTabs = (this.patternMeta && this.patternMeta.tabs)

        return hasTabs ? this.patternMeta.tabs : undefined
      },

      showIncludes() {
        const hideIncludeList = (this.patternMeta && this.patternMeta['show-include-list'] === false)

        if (this.guiPreset === 'global-pattern' || hideIncludeList) {
          return false
        }

        return true
      },

      showAssets() {
        const hideAssetList = (this.patternMeta && this.patternMeta['show-asset-list'] === false)

        if (this.guiPreset === 'global-pattern' || hideAssetList) {
          return false
        }

        return true
      },

      showDocs() {
        const hideDocs = (this.patternMeta && this.patternMeta['show-docs'] === false)

        if (hideDocs) {
          return false
        }

        return true
      }
    },

    mounted() {
      this.updatePattern()
      this.$eventHub.$on('includeErrors', val => {
        this.errorMessages = this.updateWarningsOrErrorsMessages(this.errorMessages, val, 'include')
      })

      this.$eventHub.$on('includeWarnings', val => {
        this.warningMessages = this.updateWarningsOrErrorsMessages(this.warningMessages, val, 'include')
      })
    },

    beforeDestroy() {
      this.$eventHub.$off('includeErrors')
      this.$eventHub.$off('includeWarnings')
    },

    watch: {
      '$route'() {
        this.errorMessages = []
        this.warningMessages = []

        this.updatePattern()
      }
    },

    methods: {
      updatePattern() {
        this.pattern = patternInfo(this.$route.params.id)
      },

      updateWarningsOrErrorsMessages(oldMessages, newMessages, messageType) {
        this.removeMessagesByType(oldMessages, messageType)

        return oldMessages.concat(newMessages)
      },

      removeMessagesByType(items, type) {
        if (!items) {
          return
        }
        items.forEach((item, index, object) => {
          if (item.type === type) {
            object.splice(index, 1)
          }
        })
      },

      showTab(tabName) {
        return !this.tabsToShow || (this.tabsToShow && this.tabsToShow.includes(tabName))
      }
    }
  }
</script>
