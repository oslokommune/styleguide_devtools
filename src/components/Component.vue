<template>
  <div class="osg-devtools-component__outer">
    <div class="osg-devtools-component__wrapper">
      <div :class="componentClasses" class="osg-devtools-component osg-color-bg-white osg-padding-horizontal-4">    
        <settings :component="component" />
        <div v-if="$store.state.component.sections.docs.visible" class="osg-devtools-component__tabs">
          <button @click="activeTab = 0" class="osg-button osg-button--small" :class="activeTab === 0 ? 'osg-button--active' : 'osg-button--gray' ">
            <span :class="'osg-margin-right-2 fab fa-css3'"></span>Developer
          </button>
          <button @click="activeTab = 1" class="osg-button osg-button--small" :class="activeTab === 1 ? 'osg-button--active' : 'osg-button--gray' ">
            <span :class="'osg-margin-right-2 fab fa-readme'"></span>Documentation
          </button>
          <button v-if="component.js.length" @click="activeTab = 2" class="osg-button osg-button--small" :class="activeTab === 2 ? 'osg-button--active' : 'osg-button--gray' ">
            <span :class="'osg-margin-right-2 fab fa-js'"></span>Javascript
          </button>
          <button v-if="component.vue.length" @click="activeTab = 3" class="osg-button osg-button--small" :class="activeTab === 3 ? 'osg-button--active' : 'osg-button--gray' ">
            <span :class="'osg-margin-right-2 fab fa-vuejs'"></span>Vue
          </button>
        </div>
        <div v-if="activeTab === tabIndex.developer" class="osg-devtools-component__frame-wrapper">
          <div
            v-if="$store.state.component.sections.frame.visible"
            :class="frameClasses"
            :style="`background-color: ${bgColor};`">
            <frame :hash="component.hash" :content="component.template" />
            <span class="osg-devtools-component__art"></span>
          </div>
        </div>
        <documentation v-if="activeTab === tabIndex.documentation" :component="component" />
        <javascript v-if="activeTab === tabIndex.javascript" :component="component" />
        <vue v-if="activeTab === tabIndex.vue" :component="component" />
      </div>
      <status-bar v-if="! isCleanState()" :component="component" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { componentInfo } from '../assets/js/componentInfo'
import Settings from './component/Settings'
import Documentation from './component/Documentation'
import Javascript from './component/Javascript'
import Vue from './component/Vue'
import Frame from './component/iFrame'
import StatusBar from './component/StatusBar'

export default {
  name: 'ComponentFrame',
  components: {
    Settings,
    Documentation,
    Javascript,
    Vue,
    Frame,
    StatusBar
  },

  data: () => ({    
    tabIndex: {
      developer: 0,
      documentation: 1,
      javascript: 2,
      vue: 3
    },
    component: {
      name: 'Loading...',
      js: [],
      vue: [],
      documentation: null,
      template: null,
      config: {}
    }
  }),

  computed: {
    componentClasses() {
      let classes = []
      
      if (this.$store.state.component.settings.viewSize.mobile) {
        classes.push('osg-devtools-component--small')
      } else if (this.$store.state.component.settings.viewSize.tablet) {
        classes.push('osg-devtools-component--medium')
      } else if (this.$store.state.component.settings.viewSize.desktop) {
        classes.push('osg-devtools-component--large')
      }

      if (this.isCleanState()) {
        classes.push('osg-devtools-component--clean')
      }

      return classes.join(' ')
    },

    frameClasses() {
      let classes = ['osg-devtools-component__frame']
      
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

  created() {
    var lastHash

    var upToDate = function upToDate() {
      return lastHash.indexOf(__webpack_hash__) >= 0
    }      

    this.$eventEmitter.on('webpackHotUpdate', (currentHash) => {
      lastHash = currentHash
      if (upToDate()) return

      this.updateComponent(currentHash)
    })
  },

  mounted() {
    this.updateComponent()
    this.$store.dispatch('component/updateValues', this.component.config)
  },

  beforeDestroy() {
    this.$eventEmitter.removeListener('webpackHotUpdate', function() {})
  },

  watch: {
    '$route'() {
      this.activeTab = 0
      this.updateComponent()
    },
    '$route.params.id'() {
      this.$store.dispatch('component/updateValues', this.component.config)
    }
  },

  methods: {
    updateComponent(hash = null) {
      let component = componentInfo(this.$projectStructure, this.$route.params.id)
      component.hash = hash
      this.component = component
    },

    isCleanState() {
      if (this.component) {
        if (this.component.config) {
          if (this.component.config.preset) {
            if (this.component.config.preset === "clean") {
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

.osg-devtools-component__outer {
  height: 100vh;
}

.osg-devtools-component__wrapper {
  position: relative;
  height: calc(100vh - 31px);
}

.osg-devtools-component {
  height: 100%;
  overflow: hidden;

  &__frame-wrapper {
    border: 2px solid colors.$gray;    
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

    &.osg-devtools-component--solid {
      background-image: none;
    }
  }

  &--small,
  &--medium,
  &--large {
    overflow: auto;

    & .osg-devtools-component__frame-wrapper {
      border: none;
      border-top: 2px solid colors.$gray;
      padding: 20px 0;
    }
  }

  &--small {
    .osg-devtools-component__frame {
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
        min-height: 650px !important;
        height: 650px !important;
      }
    }
  }

  &--medium {
    .osg-devtools-component__frame {
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
        min-height: 900px !important;
        height: 900px !important;
      }
    }
  }

  &--large {
    .osg-devtools-component__frame {
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
        min-height: 800px !important;
        height: 800px !important;
      }
    }
  }

  &--clean {
    overflow: auto;

    .osg-devtools-component__frame-wrapper {
      border: none;
    }

    .osg-devtools-component__frame {
      iframe {
        min-height: auto !important;
        max-height: none !important;
      }
    }
  }
}
</style>
