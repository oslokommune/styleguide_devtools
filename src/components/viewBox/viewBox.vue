<template>
  <div
    class="viewBox"
    :class="{ 'fullscreen': $store.state.pattern.settings.fullscreen }">
    <view-box-settings :pattern="pattern" v-on:setPatternValues="$store.dispatch('pattern/setPatternValues', mergedData)" />
    <div
      v-if="$store.state.pattern.sections.frame.visible"
      class="frame"
      :class="{ 'solid': $store.state.pattern.settings.backgroundSolid }"
      :style="`background-color: ${bgColor}; height: calc(${frameHeight} + 20px);`">
      <div :style="iframeSizeStyle">
        <iframe
          @load="frameContentHeight = getFrameContentHeight()"
          id="patternBox"
          :srcdoc="frameContents"
          title="Pattern" />
      </div>
    </div>
  </div>
</template>

<script>
  import ViewBoxSettings from './viewBoxSettings'
  import shared from '../sections/shared'
  import {frameStart, frameEnd} from '../../assets/js/viewBoxFrame'

  export default {
    name: 'viewBox',

    mixins: [ shared ],

    components: { ViewBoxSettings },

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
        if (this.patternVariantData.template) {
          template = this.patternVariantData.template
        } else {
          template = 'No data - check logs'
        }

        return frameStart + template + frameEnd
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
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      },
      mergedData() {
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      }
    },

    methods: {
      getFrameContentHeight() {
          return document.getElementById('patternBox').contentDocument.body.scrollHeight + 'px'
      },      
    }
  }
</script>
