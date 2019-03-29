<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <h6>Developer tools for</h6>
        <h1 class="title">Patterns</h1>
      </div>
    </section>
    <div class="view">
      <div class="notification is-danger" v-show="errorMsg.length">
        <i class="fas fa-exclamation-triangle"></i> {{ errorMsg }}
      </div>
      <div class="notification is-warning" v-show="warnMsg.length">
        <i class="fas fa-exclamation-triangle"></i> {{ warnMsg }}
      </div>
      <view-box
        :pattern="pattern"
        v-bind:active-variant.sync="activeVariant"
        v-bind:a11y-invalid.sync="a11yInvalid"
        v-bind:a11y-results.sync="a11yResults" />
      <div class="tab-content">
        <div class="tabs">
          <ul>
            <li :class="activeTab === 'docs' ? 'is-active' : null">
              <a @click="activeTab = 'docs'">Docs</a>
            </li>
            <li :class="activeTab === 'a11y' ? 'is-active' : null">
              <a @click="activeTab = 'a11y'">
                <span class="icon">
                  <i class="fas fa-check has-text-success" v-if="! a11yInvalid"></i>
                  <i class="fas fa-exclamation-triangle has-text-warning" v-if="a11yInvalid"></i>
                </span>
                <span>A11Y</span>
              </a>
            </li>
            <li :class="activeTab === 'html' ? 'is-active' : null">
              <a @click="activeTab = 'html'">HTML</a>
            </li>
            <li :class="activeTab === 'twig' ? 'is-active' : null">
              <a @click="activeTab = 'twig'">Twig</a>
            </li>
            <li :class="activeTab === 'data' ? 'is-active' : null">
              <a @click="activeTab = 'data'">Data</a>
            </li>
          </ul>
        </div>
        <docs-section :pattern="pattern" v-bind:active-variant.sync="activeVariant" v-if="activeTab === 'docs'"></docs-section>
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
      errorMsg: '',
      warnMsg: '',
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

      this.$eventHub.$on('errorMsg', val => this.errorMsg += val)
    },

    beforeDestroy() {
      this.$eventHub.$off('errorMsg')
    },

    watch: {
      '$route'() {
        this.errorMsg = ''
        this.warnMsg = ''

        this.updatePattern()
      }
    },

    methods: {
      updatePattern() {
        this.pattern = patternInfo(this.$route.params.id)
      }
    }
  }
</script>
