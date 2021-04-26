<template>
  <div
    class="viewBox"
    :class="{ 'fullscreen': $store.state.pattern.settings.fullscreen }">
    <view-box-settings
      :pattern="pattern"
      v-on:setPatternValues="$store.dispatch('pattern/setPatternValues', mergedData)"
      />
    <div
      v-if="$store.state.pattern.sections.frame.visible"
      :class="frameClasses"
      :style="`background-color: ${bgColor};`">
      <iframe :srcdoc="frameContents" width="100%" onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight + 20 +"px";}(this));' />
      <span class="osg-devtools-art"></span>
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
      }
    }
  }
</script>

<style lang="scss" scoped>
@use "system/colors";

.viewBox {  
  &.fullscreen {
    background-color: #ffffff;
    height: 100vh;
    left: 0;
    overflow: scroll;
    padding: 60px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .frame {
    background-image: linear-gradient(45deg, #eaeaea 25%, transparent 25%), linear-gradient(-45deg, #eaeaea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eaeaea 75%), linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    margin: 0 auto;

    .osg-devtools-art {
      display: none;
    }

    &.mobile {
      border: 20px solid colors.$blue-dark;
      border-bottom: 100px solid colors.$blue-dark;
      border-radius: 20px;
      position: relative;
      width: 400px;

      &::after {
        background-color: white;
        border-radius: 50%;
        bottom: -75px;
        content: "";
        display: block;
        height: 50px;
        left: calc(50% - 25px);
        position: absolute;
        width: 50px;
      }

      iframe {
        height: 600px !important;
      }
    }

    &.tablet {
      border: 20px solid colors.$blue-dark;
      border-bottom: 100px solid colors.$blue-dark;
      border-radius: 20px;
      position: relative;
      width: 650px;

      &::after {
        background-color: white;
        border-radius: 50%;
        bottom: -75px;
        content: "";
        display: block;
        height: 50px;
        left: calc(50% - 25px);
        position: absolute;
        width: 50px;
      }

      iframe {
        height: 700px !important;
      }
    }

    &.desktop {
      border: 20px solid colors.$blue-dark;
      border-radius: 20px;
      margin-bottom: 130px;
      position: relative;
      width: 1024px;

      &::before {
        background-color: colors.$blue-dark;
        bottom: -60px;
        content: "";
        display: block;
        height: 50px;
        left: calc(50% - 50px);
        position: absolute;
        width: 100px;
      }

      &::after {
        background-color: colors.$blue-dark;
        border-radius: 10px;
        bottom: -150px;
        content: "";
        display: block;
        height: 100px;
        left: calc(50% - 250px);
        position: absolute;       
        width: 500px;
      }

      .osg-devtools-art {
        background-color: colors.$blue-light;
        border-radius: 10px;
        bottom: -100px;
        display: block;
        height: 20px;
        left: calc(50% + 200px);
        position: absolute;
        width: 20px;    
        z-index: 10;
      }

      iframe {
        height: 768px !important;
      }
    }

    &.solid {
      background-image: none;
    }
  }
}
</style>
