<template>
  <div class="osg-devtools-component osg-color-bg-white osg-padding-top-3 osg-padding-bottom-4 osg-padding-horizontal-4">    
    <div
      :class="{ 'fullscreen': $store.state.component.settings.fullscreen }">
      <settings :component="component" />
      <documentation :component="component" />
      <div
        v-if="$store.state.component.sections.frame.visible"
        :class="frameClasses"
        :style="`background-color: ${bgColor};`">
        <frame :content="component.template" />
        <span class="osg-devtools-art"></span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { componentInfo } from '../assets/js/componentInfo'
import Settings from './page/Settings'
import Documentation from './page/Documentation'
import Frame from './page/iFrame'

export default {
  name: 'ComponentFrame',
  components: {
    Settings,
    Documentation,
    Frame
  },

  data: () => ({   
    component: {
      name: 'Loading...',
      cssFiles: [],
      jsFiles: [],
      mdFile: null,
      template: null,
      data: {}
    }
  }),

  computed: {
    frameClasses() {
      let classes = ['frame']
      
      if (this.$store.state.component.settings.viewSize.mobile) {
        classes.push('mobile')
      } else if (this.$store.state.component.settings.viewSize.tablet) {
        classes.push('tablet')
      } else if (this.$store.state.component.settings.viewSize.desktop) {
        classes.push('desktop')
      }

      if (this.$store.state.component.settings.backgroundSolid) {
        classes.push('solid')
      }

      return classes.join(' ')
    },

    bgColor() {
      if (typeof this.$store.state.component.settings.backgroundColor === 'object') {
        return 'rgba(' +
          this.$store.state.component.settings.backgroundColor.rgba.r +
          ', ' +
          this.$store.state.component.settings.backgroundColor.rgba.g +
          ', ' +
          this.$store.state.component.settings.backgroundColor.rgba.b +
          ', ' +
          this.$store.state.component.settings.backgroundColor.rgba.a +
          ')'
      }
      return this.$store.state.component.settings.backgroundColor
    },
  },

  mounted() {
    this.updateComponent()
  },

  watch: {
    '$route'() {
      this.updateComponent()
    },
    '$route.params.id'() {
      this.$store.dispatch('component/updateValues', this.component.data)
    }
  },

  methods: {
    updateComponent() {
      this.component = componentInfo(this.$route.params.id)
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
      width: 1064px;

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
