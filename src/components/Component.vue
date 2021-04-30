<template>
  <div class="osg-devtools-component osg-color-bg-white osg-padding-top-3 osg-padding-bottom-4 osg-padding-horizontal-4">    
    <div
      :class="{ 'fullscreen': $store.state.pattern.settings.fullscreen }">
      <component-settings
        :pattern="pattern"
        v-on:setPatternValues="$store.dispatch('pattern/setPatternValues', mergedData)"
        />

      <component-documentation :pattern="pattern" activeVariant=""></component-documentation>
      <div
        v-if="$store.state.pattern.sections.frame.visible"
        :class="frameClasses"
        :style="`background-color: ${bgColor};`">
        <iframe :srcdoc="frameContents" width="100%" onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight + 30 +"px";}(this));' />
        <span class="osg-devtools-art"></span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { patternInfo } from '../assets/js/patternInfo'
import ComponentSettings from './ComponentSettings'
import ComponentDocumentation from './ComponentDocumentation'

export default {
  name: 'ComponentFrame',
  components: {
    ComponentSettings,
    ComponentDocumentation
  },

  data: () => ({   
    pattern: {
      name: 'Loading...',
      files: [],
      cssFiles: [],
      jsFiles: [],
      mdFile: null,
      variants: []
    }
  }),

  computed: {
    patternVariantData() {
      let data = {
        template: '',
        contents: '{}'
      }
      if (this.pattern.variants[0]) {
        data.template = this.pattern.variants[0].template
        data.contents = this.pattern.variants[0].contents
      }

      return data
    },

    mergedData() {
      return JSON.parse(this.patternVariantData.contents)
    },

    patternPath() {
      return process.env.COMPONENTS_PATH // eslint-disable-line
    },

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
        template =
        `<!DOCTYPE html><html><body class="${this.$store.state.pattern.sections.code.visible ? 'code' : 'no-code'}">
        <link href="/main.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css" integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==" crossorigin="anonymous" />
        <style>body { background-color: inherit; }</style>
        ${this.patternVariantData.template}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js" integrity="sha512-YBk7HhgDZvBxmtOfUdvX0z8IH2d10Hp3aEygaMNhtF8fSOvBZ16D/1bXZTJV6ndk/L/DlXxYStP8jrF77v2MIg==" crossorigin="anonymous"><\/script>
        <script src="/devtools.js"><\/script></body></html>`
      }

      return template
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

  mounted() {
    this.updatePattern()
  },

  watch: {
    '$route'() {
      this.updatePattern()
    },
    '$route.params.id'() {
      this.$store.dispatch('pattern/setPatternValues', this.mergedData)
    },
    mergedData() {
      this.$store.dispatch('pattern/setPatternValues', this.mergedData)
    }
  },

  methods: {
    updatePattern() {
      this.pattern = patternInfo(this.$route.params.id)
    }
  }
}
</script>
<style lang="scss">
@use "system/colors";
@use "system/spacing";

.code .osg-devtools-code {
  pre {
    @extend %osg-padding-2, %osg-margin-top-3;
    
    background-color: colors.$gray-light;
    border: 2px solid colors.$grayscale-20;
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
    overflow-x: auto;
  }
}

.no-code .osg-devtools-code pre {
  display: none;
}

.osg-devtools-component {
  min-height: calc(100vh - 160px);

  .fullscreen {
    background-color: #ffffff;
    height: 100vh;
    left: 0;
    overflow: scroll;
    padding: 15px 30px;
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
      width: 809px;

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
        height: 900px !important;
      }
    }

    &.desktop {
      border: 20px solid colors.$blue-dark;
      border-radius: 20px;
      margin-bottom: 130px;
      position: relative;
      width: 1200px;

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
        height: 800px !important;
      }
    }

    &.solid {
      background-image: none;
    }
  }
}
</style>
