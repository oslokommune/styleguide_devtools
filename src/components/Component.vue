<template>
  <div class="component osg-color-bg-white">
    <section class="osg-color-bg-blue-dark osg-color-text-white osg-padding-4">
      <h6 class="osg-heading-6 osg-margin-top-3 osg-margin-bottom-none">Oslo style guide</h6>
      <h1 class="osg-heading-2 osg-margin-bottom-none">Styles &amp; Component library</h1>
    </section>
    <div class="view osg-padding-4">
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
                  <i class="fas fa-check osg-state-text-success" v-if="! a11yInvalid"></i>
                  <i class="fas fa-exclamation-triangle osg-state-text-warning" v-if="a11yInvalid"></i>
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

<style lang="scss" scoped>
@import '~styleguide/src/assets/sass/complete.scss';

.tab-content {
  @extend %osg-text-5;
  .tabs {
    border-bottom: 1px solid black;
    color: $osg-color-gray-dark;
    margin-bottom: 10px;
    padding-bottom: 10px;

    ul {
      display: flex;
      margin-top: 20px;
    }

    li {
      padding-right: 20px;

      &.is-active {
        color: $osg-color-blue-contrast;
      }

      a {
        cursor: pointer;
      }
    }
  }
}
</style>
