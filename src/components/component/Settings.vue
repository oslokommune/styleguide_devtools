<template>
  <div class="osg-row" v-if="$store.state.component.settings.visible">
    <div class="osg-row__column osg-row__column--6">
      <h1 class="osg-heading-1" v-if="$store.state.component.settings.sections.title.visible">{{ component.name|capitalize }}</h1>
    </div>
    <div class="osg-row__column osg-row__column--6 osg-devtools-button-list osg-text-right" v-if="$store.state.component.settings.sections.configuration.visible">
      <color-picker @pick="setColor" />
      <a aria-role="button" :class="'osg-margin-left-3 osg-button osg-button--small' + (fullscreen ? ' osg-button--active' : '')" @click="toggleFullscreen(); $event.target.blur()">
        <i class="fas fa-expand" title="Fullscreen mode"></i>
      </a>
      <a aria-role="button" :class="'osg-button osg-button--small' + (code ? ' osg-button--active' : '')" @click="toggleCode(); $event.target.blur()">
        <i class="fas fa-code" title="Code"></i>
      </a>
      <a aria-role="button" class="osg-margin-left-3 osg-button osg-button--small" @click="zoomOut(); $event.target.blur()">
        <i class="fas fa-search-minus" title="Zoom out"></i>
      </a>
      <a aria-role="button" class="osg-button osg-button--small" @click="zoomIn(); $event.target.blur()">
        <i class="fas fa-search-plus" title="Zoom in"></i>
      </a>
      <a aria-role="button" :class="'osg-margin-left-3 osg-button osg-button--small osg-button--blue-light' + ($store.state.component.settings.viewSize.mobile ? ' osg-button--active' : '')" @click="setViewSize('mobile'); $event.target.blur()">
        S
      </a>
      <a aria-role="button" :class="'osg-button osg-button--small osg-button--green-light' + ($store.state.component.settings.viewSize.tablet ? ' osg-button--active' : '')" @click="setViewSize('tablet'); $event.target.blur()">
        M
      </a>
      <a aria-role="button" :class="'osg-button osg-button--small osg-button--yellow' + ($store.state.component.settings.viewSize.desktop ? ' osg-button--active' : '')" @click="setViewSize('desktop'); $event.target.blur()">
        L
      </a>
      <a aria-role="button" :class="'osg-button osg-button--small' + ($store.state.component.settings.viewSize.full ? ' osg-button--active' : '')" @click="setViewSize('full'); $event.target.blur()">
        <i class="fas fa-percentage" title="Full width"></i>
      </a>
      <a aria-role="button" class="osg-margin-left-3 osg-button osg-button--small osg-button--red" @click="$store.dispatch('personal/reset'); $event.target.blur()">
        <i class="fas fa-industry"></i>
      </a>
    </div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue'
export default {
  name: 'ComponentSettings',
  components: { ColorPicker },

  props: {
    component: {
      type: Object,
      required: true
    }
  },

  data: () => ({}),

  computed: {
    backgroundColor: {
      get: function() {
        return this.$store.state.personal.settings.backgroundColor
      },
      set: function(value) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            backgroundColor: value
          }
        })
      }
    },

    backgroundSolid: {
      get: function() {
        return this.$store.state.personal.settings.backgroundSolid
      },
      set: function(value) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            backgroundSolid: value
          }
        })
      }
    },

    fullscreen: {
      get: function() {
        return this.$store.state.personal.settings.fullscreen
      },
      set: function(value) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            fullscreen: value
          }
        })
      }
    },

    code: {
      get: function() {
        return this.$store.state.personal.sections.code.visible
      },
      set: function(value) {
        this.$store.dispatch('personal/setValues', {
          sections: {
            code: {
              visible: value
            }
          }
        })
      }
    }
  },

  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
    },

    toggleDocumentation() {
      this.documentation = !this.documentation
    },

    toggleCode() {
      this.code = !this.code
    },

    setViewSize(size) {
      this.$store.dispatch('personal/setViewSize', size)
    },

    setColor(color, solid) {
      this.backgroundColor = color
      this.backgroundSolid = solid
    },

    zoomIn() {
      let currentZoom = this.$store.state.personal.settings.zoom
      if (currentZoom < 500) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            zoom: currentZoom + 10
          }
        })
      }
    },

    zoomOut() {
      let currentZoom = this.$store.state.personal.settings.zoom      
      if (currentZoom > 50) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            zoom: currentZoom - 10
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.osg-devtools-button-list {
  > a {    
    margin-top: 22px
  }
}
</style>
