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
        v-bind:active-variant.sync="activeVariant"
        v-bind:a11y-invalid.sync="a11yInvalid"
        v-bind:a11y-results.sync="a11yResults" />
      <div class="tab-content" v-if="renderTab('docs') || renderTab('accessibility') || renderTab('html') || renderTab('twig') || renderTab('json')">
        <div class="tabs">
          <ul>
            <li v-if="renderTab('docs')" :class="isTabActive('docs') ? 'is-active' : null">
              <a @click="setActiveTab('docs')">Docs</a>
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
            <li v-if="renderTab('twig')" :class="isTabActive('twig') ? 'is-active' : null">
              <a @click="setActiveTab('twig')">Twig</a>
            </li>
            <li v-if="renderTab('json')" :class="isTabActive('json') ? 'is-active' : null">
              <a @click="setActiveTab('json')">Data</a>
            </li>
          </ul>
        </div>
        <docs-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('docs') && renderTab('docs')"></docs-section>
        <a11y-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('accessibility') && renderTab('accessibility')" :a11yResults="a11yResults"></a11y-section>
        <html-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('html') && renderTab('html')"></html-section>
        <twig-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('twig') && renderTab('twig')"></twig-section>
        <json-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="isTabActive('json') && renderTab('json')"></json-section>
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
        this.$store.dispatch('pattern/setDefaults')
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
