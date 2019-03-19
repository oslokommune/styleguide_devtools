<template>
  <div :class="'viewBox' + ($store.state.viewBox.fullscreen ? ' fullscreen' : '')">
    <view-box-settings :title="pattern.name" />
    <div class="tabs is-boxed">
      <ul>
        <li :class="variantName === activeVariant ? 'is-active' : ''" v-for="variantName in patternVariantNames" v-bind:key="variantName">
          <a @click="$emit('update:activeVariant', variantName)">{{ variantName|snakeToRegular|capitalize }}</a>
        </li>
      </ul>
    </div>
    <div :class="'frame' + ($store.state.viewBox.backgroundSolid ? ' solid' : '') + (!$store.state.viewBox.ruler ? ' no-ruler' : '')" :style="'background-color: ' + bgColor">
      <iframe id="patternBox" :style="iframeSizeStyle" :srcdoc="frameContents" title="Pattern"></iframe>
      <div v-if="$store.state.viewBox.ruler" class="view-width-indicator" :style="'width: ' + frameWidth">
        <div class="arrow-head-left"></div>
        <div class="width-indicator">
          {{ frameWidth }}
        </div>
        <div class="arrow-head-right"></div>
      </div>
      <div v-if="$store.state.viewBox.ruler" class="view-height-indicator" :style="viewHeightIndicatorStyle">
        <div class="arrow-head-left"></div>
        <div class="height-indicator">
          {{ (frameHeight + 'px') }}
        </div>
        <div class="arrow-head-right"></div>
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
      }
    },

    data: () => ({
      mobileHeight: '667',
      frameContentHeight: ''
    }),

    computed: {
      iframeSizeStyle() {
        return 'width: ' + this.frameWidth + '; height: ' + this.frameHeight + 'px'
      },

      frameContents() {
        let contents = frameStart
        if (this.$store.state.viewBox.viewMode.single) {
          contents += frameSingle(this.patternVariantData.template)
        } else if (this.$store.state.viewBox.viewMode.grid) {
          contents += frameGrid(this.patternVariantData.template)
        } else if (this.$store.state.viewBox.viewMode.random) {
          contents += frameRandom(this.patternVariantData.template)
        }
        contents += frameEnd
        return contents
      },

      bgColor() {
        if (this.mergedData.meta && this.mergedData.meta['background-color']) {
          return this.mergedData.meta['background-color']
        }
        if (typeof this.$store.state.viewBox.backgroundColor === 'object') {
          return 'rgba(' +
            this.$store.state.viewBox.backgroundColor.rgba.r +
            ', ' +
            this.$store.state.viewBox.backgroundColor.rgba.g +
            ', ' +
            this.$store.state.viewBox.backgroundColor.rgba.b +
            ', ' +
            this.$store.state.viewBox.backgroundColor.rgba.a +
            ')'
        }
        return this.$store.state.viewBox.backgroundColor
      },

      frameWidth() {
        if (this.$store.state.viewBox.viewSize.mobile) {
          return '375px'
        } else if (this.$store.state.viewBox.viewSize.tablet) {
          return '769px'
        } else if (this.$store.state.viewBox.viewSize.desktop) {
          return '1088px'
        } else if (this.$store.state.viewBox.viewSize.full) {
          return '100%'
        }

        return '100%'
      },

      frameHeight() {
        if (this.mergedData.meta && this.mergedData.meta['min-height']) {
          return this.mergedData.meta['min-height']
        } else if (this.$store.state.viewBox.viewSize.mobile) {
          return this.mobileHeight
        }

        return this.frameContentHeight
      },

      viewHeightIndicatorStyle() {
        return 'left: calc(' + this.frameWidth +
          (this.$store.state.viewBox.viewSize.full ? ' - 1%' : ' + 40px') +
          '); width: ' + (this.frameHeight + 'px;')
      },
    },

    mounted() {
      let frames = [...document.getElementsByTagName('iframe')]
      frames.forEach((frame) => {
        frame.addEventListener('load', () => {
          this.frameContentHeight = this.getFrameContentHeight()
        }, true)
      })
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
      },
      frameContents() {
        this.a11yValidate()
      }
    },

    methods: {
      getFrameContentHeight() {
        return document.getElementById('patternBox').contentDocument.body.scrollHeight
      },

      a11yValidate() {
        let domParser = new DOMParser();
        let patternDocument = domParser.parseFromString(this.frameContents, 'text/html');
        axeCore.run(
          patternDocument,
          {
            runOnly: ["wcag2a", "wcag2aa"],
            rules: {
              "valid-lang": { enabled: false },
              "page-has-heading-one": { enabled: false },
              "meta-viewport": { enabled: false },
              "meta-viewport-large": { enabled: false },
              "html-xml-lang-mismatch": { enabled: false },
              "html-lang-valid": { enabled: false },
              "html-has-lang": { enabled: false },
              "document-title": { enabled: false },
              "aria-hidden-body": { enabled: false }
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
