<template>
  <div
    class="viewBox"
    :class="{ 'fullscreen': $store.state.pattern.settings.fullscreen }">
    <view-box-settings :pattern="pattern" v-on:setPatternValues="$store.dispatch('pattern/setPatternValues', mergedData)" />
    <div class="device-frame">
      <div
        v-if="$store.state.pattern.sections.frame.visible"
        :class="frameClasses"
        :style="`background-color: ${bgColor};`">
        <iframe :srcdoc="frameContents" width="100%" />
      </div>
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
      frame: null
    }),

    mounted() {
      this.frame = document.querySelector('iframe')
      this.frame.addEventListener('load', this.syncHeight)
    },

    beforeDestroy() {
      this.frame.removeEventListener('load', this.syncHeight)
    },

    computed: {
      frameClasses() {
        let classes = ['frame']
        
        if (this.$store.state.pattern.settings.viewSize.mobile) {
          classes.push('mobile')
        } else if (this.$store.state.pattern.settings.viewSize.tablet) {
          classes.push('tablet')
        } else if (this.$store.state.pattern.settings.viewSize.desktop) {
          classes.push('desktop')
        }

        if (this.$store.state.pattern.settings.backgroundSolid) {
          classes.push('solid')
        }

        return classes.join(' ')
      },

      frameContents() {
        let template = 'No data - check logs'
        if (this.patternVariantData.template) {
          template = '<link href="/main.css" rel="stylesheet" type="text/css">'
          template += '<style>body { background-color: inherit; }</style>'
          template += this.patternVariantData.template
        }
        return template;
      },

      bgColor() {
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
    },

    watch: {
      '$route.params.id'() {
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      },
      mergedData() {
        this.$store.dispatch('pattern/setPatternValues', this.mergedData)
      },
      'this.$store.state.pattern.settings.viewSize.full'() {
        if ($store.state.pattern.settings.viewSize.full) {
          this.syncHeight()
        }
      }
    },

    methods: {
      syncHeight() {
        this.frame.style.height = `${this.frame.contentWindow.document.body.offsetHeight + 30}px`
      }
    }
  }
</script>

<style lang="scss" scoped>
@use "system/colors";

.viewBox {
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    padding: 60px;
    overflow: scroll;
    z-index: 100;
  }

  .frame {
    background-image: linear-gradient(45deg, #eaeaea 25%, transparent 25%), linear-gradient(-45deg, #eaeaea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eaeaea 75%), linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;

    &.mobile {
      border: 20px solid colors.$blue-dark;
      border-bottom: 100px solid colors.$blue-dark;
      border-radius: 20px;
      width: 400px;
      position: relative;

      iframe {
        height: 600px !important;
      }
    }

    &.tablet {
      border: 20px solid colors.$blue-dark;
      border-bottom: 100px solid colors.$blue-dark;
      border-radius: 20px;
      width: 768px;

      iframe {
        height: 600px;
      }
    }

    &.desktop {
      border: 20px solid colors.$blue-dark;
      border-radius: 20px;
      width: 1024px;

      iframe {
        height: 768px;
      }
    }

    &.solid {
      background-image: none;
    }
  }
}
</style>
