<template>
  <div
    class="viewBox"
    :class="{ 'fullscreen': $store.state.pattern.settings.fullscreen }">
    <view-box-settings :pattern="pattern" v-on:setPatternValues="$store.dispatch('pattern/setPatternValues', mergedData)" />
    <div
      v-if="$store.state.pattern.sections.frame.visible"
      class="frame"
      :class="{ 'solid': $store.state.pattern.settings.backgroundSolid }"
      :style="`background-color: ${bgColor};`">
      <div v-html="frameContents"></div>
    </div>
  </div>
</template>

<script>
  import ViewBoxSettings from './viewBoxSettings'
  import shared from '../sections/shared'

  export default {
    name: 'viewBox',

    mixins: [ shared ],

    components: { ViewBoxSettings },

    data: () => ({
      mobileHeight: '667px',
      frameContentHeight: ''
    }),

    computed: {
      frameContents() {
        let template
        if (this.patternVariantData.template) {
          template = this.patternVariantData.template
        } else {
          template = 'No data - check logs'
        }
        return template;
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
    },

    watch: {
      '$route.params.id'() {
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      },
      mergedData() {
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      }
    }
  }
</script>
