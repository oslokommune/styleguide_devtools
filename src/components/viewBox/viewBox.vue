<template>
  <div
    class="viewBox"
    :class="{ 'fullscreen': $store.state.pattern.settings.fullscreen }">
    <view-box-settings :modifiers="pattern.modifiers" :title="pattern.name" v-on:setPatternValues="$store.dispatch('pattern/setPatternValues', mergedData)" />
    <div v-if="patternVariantNames.length > 1" class="tabs is-boxed">
      <ul>
        <li
          :class="{ 'is-active': variantName === activeVariant }"
          v-for="variantName in patternVariantNames"
          v-bind:key="variantName">
          <a @click="$emit('update:activeVariant', variantName)">
            {{ variantName|snakeToRegular|capitalize }}
          </a>
        </li>
      </ul>
    </div>
    <div
      v-if="$store.state.pattern.sections.frame.visible"
      class="frame"
      :class="{ 'solid': $store.state.pattern.settings.backgroundSolid, 'no-ruler': !$store.state.pattern.settings.ruler }"
      :style="`background-color: ${bgColor}; height: calc(${frameHeight} + 60px);`">
      <div :style="iframeSizeStyle">
        <iframe
          @load="frameContentHeight = getFrameContentHeight()"
          id="patternBox"
          :srcdoc="frameContents"
          title="Pattern" />
        <div
          v-if="$store.state.pattern.settings.ruler"
          class="view-width-indicator"
          :style="`width: ${frameWidth}`">
          <div class="arrow-head-left" />
          <div class="width-indicator">
            {{ frameWidth }}
          </div>
          <div class="arrow-head-right" />
        </div>
        <div v-if="$store.state.pattern.settings.ruler"
          class="view-height-indicator"
          :style="viewHeightIndicatorStyle">
          <div class="arrow-head-left" />
          <div class="height-indicator">
            {{ frameHeight }}
          </div>
          <div class="arrow-head-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axeCore from 'axe-core'
  import ViewBoxSettings from './viewBoxSettings'
  import shared from '../sections/shared'
  import {frameStart, frameSingle, frameGrid, frameRandom, frameEnd} from '../../assets/js/viewBoxFrame'

  export default {
    name: 'viewBox',

    mixins: [ shared ],

    components: { ViewBoxSettings },

    props: {
      a11yInvalid: {
        type: Boolean,
        required: true
      },
      a11yResults: {
        type: Object,
        required: true
      },
    },

    data: () => ({
      mobileHeight: '667px',
      frameContentHeight: ''
    }),

    computed: {
      iframeSizeStyle() {
        return `width: ${this.frameWidth}; height: calc(${this.frameHeight} + 10px)`
      },

      frameContents() {
        let template
        if (this.$store.state.pattern.settings.contentPlaceholders) {
          template = this.patternVariantData.template.replace(
            /<!-- your content here -->/gi,
            '<div class="osgdt-consumer-content">custom content</div>'
          )
        } else {
          template = this.patternVariantData.template
        }

        let contents = frameStart
        if (this.$store.state.pattern.settings.viewMode.single) {
          contents += frameSingle(template)
        } else if (this.$store.state.pattern.settings.viewMode.grid) {
          contents += frameGrid(template)
        } else if (this.$store.state.pattern.settings.viewMode.random) {
          contents += frameRandom(template)
        }
        contents += frameEnd
        return contents
      },

      bgColor() {
        if (this.mergedData.devtools && this.mergedData.devtools['background-color']) {
          return this.mergedData.devtools['background-color']
        }
        if (typeof this.$store.state.pattern.settings.backgroundColor === 'object') {
          return 'rgba(' +
            this.$store.state.pattern.settings.backgroundColor.rgba.r +
            ', ' +
            this.$store.state.pattern.settings.backgroundColor.rgba.g +
            ', ' +
            this.$store.state.pattern.settings.backgroundColor.rgba.b +
            ', ' +
            this.$store.state.pattern.settings.backgroundColor.rgba.a +
            ')'
        }
        return this.$store.state.pattern.settings.backgroundColor
      },

      frameWidth() {
        if (this.$store.state.pattern.settings.viewSize.mobile) {
          return '375px'
        } else if (this.$store.state.pattern.settings.viewSize.tablet) {
          return '769px'
        } else if (this.$store.state.pattern.settings.viewSize.desktop) {
          return '1088px'
        } else if (this.$store.state.pattern.settings.viewSize.full) {
          return '100%'
        }

        return '100%'
      },

      frameHeight() {
        if (
          this.mergedData.devtools &&
          this.mergedData.devtools.frame &&
          this.mergedData.devtools.frame['min-height']
        ) {
          return this.mergedData.devtools.frame['min-height']
        } else if (this.$store.state.pattern.settings.viewSize.mobile) {
          return this.mobileHeight
        }

        return this.frameContentHeight
      },

      viewHeightIndicatorStyle() {
        return `
          left: calc(${this.frameWidth} ${(this.$store.state.pattern.settings.viewSize.full ? '- 1%' : '+ 40px')});
          width: ${this.frameHeight};
        `
      }
    },

    beforeCreate() {
      this.$eventHub.$on('viewBox.setViewSize', () => {
        this.$nextTick(() => {
          this.frameContentHeight = this.getFrameContentHeight()
        })
      })

      this.$eventHub.$on('viewBox.setFullscreen', () => {
        this.$nextTick(() => {
          this.frameContentHeight = this.getFrameContentHeight()
        })
      })
    },

    beforeDestroy() {
      this.$eventHub.$off('viewBox.setViewSize')
      this.$eventHub.$off('viewBox.setFullscreen')
    },

    watch: {
      '$route.params.id'() {
        this.$emit('update:activeVariant', 'default')
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      },
      frameContents() {
        this.a11yValidate()
      },
      mergedData() {
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      }
    },

    methods: {
      getFrameContentHeight() {
          return document.getElementById('patternBox').contentDocument.body.scrollHeight + 'px'
      },

      a11yValidate() {
          let domParser = new DOMParser();
          let patternDocument = domParser.parseFromString(this.frameContents, 'text/html');
          axeCore.run(
              patternDocument,
              {
                  runOnly: ["wcag2a", "wcag2aa"],
                  rules: {
                      "valid-lang": {enabled: false},
                      "page-has-heading-one": {enabled: false},
                      "meta-viewport": {enabled: false},
                      "meta-viewport-large": {enabled: false},
                      "html-xml-lang-mismatch": {enabled: false},
                      "html-lang-valid": {enabled: false},
                      "html-has-lang": {enabled: false},
                      "document-title": {enabled: false},
                      "aria-hidden-body": {enabled: false}
                  }
              },
              (error, results) => {
                  if (results) {
                      this.$emit('update:a11yResults', results)
                      this.$emit('update:a11yInvalid', results.violations && results.violations.length > 0)
                  } else {
                      this.$emit('update:a11yResults', {})
                  }
              }
          )
      }
    }
  }
</script>
