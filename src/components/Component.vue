<template>
  <div class="osg-devtools-component osg-color-bg-white osg-padding-horizontal-4" :class="{ 'osg-devtools-component--clean': isCleanState() }">    
    <div
      :class="{'osg-devtools-component--fullscreen': $store.state.component.settings.fullscreen }">
      <settings :component="component" />
      <div v-if="$store.state.component.sections.docs.visible" class="osg-devtools-component__tabs osg-margin-bottom-2">
        <button v-for="(tab, index) in tabs" v-bind:key="index" @click="activeTab = index" :class="activeTab === index ? 'osg-button osg-button--active osg-button--small' : 'osg-button osg-button--outline osg-button--small'">{{ tab }}</button>
      </div>
      <div
        v-if="activeTab === 0 && $store.state.component.sections.frame.visible"
        :class="frameClasses"
        :style="`background-color: ${bgColor};`">
        <frame :content="component.template" />
        <span class="osg-devtools-component__art"></span>
      </div>
      <documentation v-if="activeTab === 1" :component="component" />      
      <status-bar v-if="! isCleanState()" :component="component" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { componentInfo } from '../assets/js/componentInfo'
import Settings from './component/Settings'
import Documentation from './component/Documentation'
import Frame from './component/iFrame'
import StatusBar from './component/StatusBar'

export default {
  name: 'ComponentFrame',
  components: {
    Settings,
    Documentation,
    Frame,
    StatusBar
  },

  data: () => ({    
    tabs: [      
      "View", "Documentation"
    ],
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

    activeTab: {
      get: function() {
        return this.$store.state.component.settings.activeTab
      },
      set: function(value) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            activeTab: value
          }
        })
      }
    }
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
    },

    isCleanState() {
      if (this.component) {
        if (this.component.data) {
          if (this.component.data.preset) {
            if (this.component.data.preset === "clean") {
              return true
            }
          }
        }
      }

      return false
    }
  }
}
</script>
<style lang="scss">
@use "system/colors";

.osg-devtools-component {
  position: relative;
  height: 100vh;
  overflow: hidden;

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
      width: 414px;

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
        min-height: auto !important;
        height: 650px !important;
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
        min-height: auto !important;
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
        min-height: auto !important;
        height: 800px !important;
      }
    }

    &.osg-devtools-component--solid {
      background-image: none;
    }
  }

  &--clean {
    overflow: auto;

    .osg-devtools-component__frame {
      iframe {
        min-height: auto !important;
        max-height: none !important;
      }
    }
  }
}
</style>
