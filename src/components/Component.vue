<template>
  <div class="osg-devtools-component-wrapper">
    <div class="osg-devtools-component osg-color-bg-white osg-padding-top-3 osg-padding-bottom-4 osg-padding-horizontal-4">    
      <div
        :class="{'osg-devtools-component--fullscreen': $store.state.component.settings.fullscreen }">
        <settings :component="component" />
        <documentation :component="component" />
        <div
          v-if="$store.state.component.sections.frame.visible"
          :class="frameClasses"
          :style="`background-color: ${bgColor};`">
          <frame :content="component.template" />
          <span class="osg-devtools-component__art"></span>
        </div>
      </div>
    </div>
    <div class="osg-devtools-infobar">
      <div class="osg-color-bg-yellow osg-padding-2 osg-text-center">
        <span class="osg-text-7">1.0</span>
      </div>
      <div class="osg-color-bg-red osg-padding-vertical-1 osg-padding-horizontal-2">
        <span class="fab fa-chrome osg-text-2"></span>
      </div>
      <div class="osg-color-bg-red osg-padding-vertical-1 osg-padding-horizontal-2">
        <span class="fab fa-edge osg-text-2"></span>
      </div>
      <div class="osg-color-bg-green-light osg-padding-vertical-1 osg-padding-horizontal-2">
        <span class="fab fa-firefox-browser osg-text-2"></span>
      </div>
      <div class="osg-color-bg-red osg-padding-vertical-1 osg-padding-horizontal-2">
        <span class="fab fa-safari osg-text-2"></span>
      </div>
      <div class="osg-color-bg-green-light osg-padding-vertical-1 osg-padding-horizontal-2">
        <span class="fas fa-universal-access osg-text-2"></span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { componentInfo } from '../assets/js/componentInfo'
import Settings from './component/Settings'
import Documentation from './component/Documentation'
import Frame from './component/iFrame'

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
      let classes = ['osg-devtools-component__frame']
      
      if (this.$store.state.component.settings.viewSize.mobile) {
        classes.push('osg-devtools-component--mobile')
      } else if (this.$store.state.component.settings.viewSize.tablet) {
        classes.push('osg-devtools-component--tablet')
      } else if (this.$store.state.component.settings.viewSize.desktop) {
        classes.push('osg-devtools-component--desktop')
      }

      if (this.$store.state.component.settings.backgroundSolid) {
        classes.push('osg-devtools-component--solid')
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
    this.$store.dispatch('component/updateValues', this.component.data)
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

.osg-devtools-component-wrapper {
  display: flex;
}

.osg-devtools-infobar {
  background-color: colors.$gray;
  flex-grow: 1;
  height: 100vh;
  max-width: 44px;
}

.osg-devtools-component {
  flex-grow: 2;
  height: 100vh;
  overflow-y: auto;

  .osg-devtools-component--fullscreen {
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

  .osg-devtools-component__frame {
    background-image: linear-gradient(45deg, #eaeaea 25%, transparent 25%), linear-gradient(-45deg, #eaeaea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eaeaea 75%), linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    line-height: 0;
    margin: 0 auto;

    .osg-devtools-component__art {
      display: none;
    }

    &.osg-devtools-component--mobile {
      border: 20px solid colors.$grayscale-80;
      border-bottom: 100px solid colors.$grayscale-80;
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

    &.osg-devtools-component--tablet {
      border: 20px solid colors.$grayscale-80;
      border-bottom: 100px solid colors.$grayscale-80;
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

    &.osg-devtools-component--desktop {
      border: 20px solid colors.$grayscale-80;
      border-radius: 20px;
      margin-bottom: 130px;
      position: relative;
      width: 1064px;

      &::before {
        background-color: colors.$grayscale-80;
        bottom: -60px;
        content: "";
        display: block;
        height: 50px;
        left: calc(50% - 50px);
        position: absolute;
        width: 100px;
      }

      &::after {
        background-color: colors.$grayscale-80;
        border-radius: 10px;
        bottom: -150px;
        content: "";
        display: block;
        height: 100px;
        left: calc(50% - 250px);
        position: absolute;       
        width: 500px;
      }

      .osg-devtools-component__art {
        background-color: colors.$green-light;
        border-radius: 10px;
        bottom: -90px;
        display: block;
        height: 15px;
        left: calc(50% + 210px);
        position: absolute;
        width: 15px;    
        z-index: 10;
      }

      iframe {
        height: 800px !important;
      }
    }

    &.osg-devtools-component--solid {
      background-image: none;
    }
  }
}
</style>
