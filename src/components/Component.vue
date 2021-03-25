<template>
  <div>
    <section class="hero osg-color-bg-blue-dark osg-color-text-white">
      <div class="hero-body">
        <h6  class="osg-heading-5">Oslo style guide</h6>
        <h1 class="osg-heading-2">Grid, styles & component library</h1>
      </div>
    </section>
    <div class="view">
      <view-box
        :pattern="pattern"
        v-bind:active-variant.sync="activeVariant"
        v-bind:a11y-invalid.sync="a11yInvalid"
        v-bind:a11y-results.sync="a11yResults" />
      <div class="tab-content" v-if="renderTab('docs') || renderTab('accessibility') || renderTab('html')">
        <div class="tabs" v-if="showTabs()">
          <ul>
            <li v-if="renderTab('docs')" :class="isTabActive('docs') ? 'is-active' : null">
              <a @click="setActiveTab('docs')">Documentation</a>
            </li>
            <li v-if="renderTab('accessibility')" :class="isTabActive('accessibility') ? 'is-active' : null">
              <a @click="setActiveTab('accessibility')">
                <span class="icon">
                  <i class="fas fa-check has-text-success" v-if="! a11yInvalid"></i>
                  <i class="fas fa-exclamation-triangle has-text-warning" v-if="a11yInvalid"></i>
                </span>
                <span>A11Y</span>
              </a>
            </li>
            <li v-if="renderTab('html')" :class="isTabActive('html') ? 'is-active' : null">
              <a @click="setActiveTab('html')">HTML</a>
            </li>
          </ul>
        </div>
        <docs-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('docs') && renderTab('docs')"></docs-section>
        <a11y-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('accessibility') && renderTab('accessibility')" :a11yResults="a11yResults"></a11y-section>
        <html-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('html') && renderTab('html')"></html-section>
      </div>
    </div>
  </div>
</template>

<script>
  import {patternInfo} from '../assets/js/patternInfo'
  import ViewBox from './viewBox/viewBox'
  import DocsSection from './sections/docsSection'
  import HtmlSection from './sections/htmlSection'
  import a11ySection from './sections/a11ySection'

  export default {
    name: 'ComponentFrame',

    components: {
      HtmlSection,
      DocsSection,
      a11ySection,
      ViewBox
    },

    data: () => ({
      activeVariant: 'default',
      a11yInvalid: false,
      a11yResults: {},
      pattern: {
        name: 'Loading...',
        files: [],
        cssFiles: [],
        jsFiles: [],
        mdFile: null,
        variants: []
      }
    }),

    mounted() {
      this.updatePattern()
    },

    watch: {
      '$route'() {
        this.updatePattern()
      }
    },

    methods: {
      updatePattern() {
        this.pattern = patternInfo(this.$route.params.id)
      },

      showTabs() {
        return this.$store.state.pattern.sections.tabs.visible
      },

      isTabActive(tab) {
        return this.$store.state.pattern.sections[tab].active
      },

      setActiveTab(tab) {
        this.$store.dispatch('pattern/setActiveSection', tab)
      },

      renderTab(tab) {
        return this.$store.state.pattern.sections[tab].visible
      }
    }
  }
</script>
