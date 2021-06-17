<template>
  <div class="osg-devtools-settings">
    <div class="osg-row" v-if="$store.state.component.settings.visible">
      <div class="osg-row__column osg-row__column--6">
        <h1 class="osg-heading-1" v-if="$store.state.component.settings.sections.title.visible">{{ component.name|capitalize }}</h1>
      </div>
      <div class="osg-row__column osg-row__column--6 osg-devtools-button-list osg-text-right" v-if="$store.state.component.settings.sections.configuration.visible && devMode">
        <color-picker @pick="setColor" />
        <a aria-role="button" :class="'osg-margin-left-15 osg-button osg-button--small osg-button--icon' + (fullscreen ? ' osg-button--active' : '')" @click="toggleFullscreen(); $event.target.blur()" title="Fullscreen">
          <span class="osg-button__icon osg-icons--expand"></span>
        </a>
        <a aria-role="button" class="osg-margin-left-15 osg-button osg-button--small osg-button--icon" @click="zoomIn(); $event.target.blur()" title="Zoom in">
          <span class="osg-button__icon osg-icons--plus-sign"></span>
        </a>
        <a aria-role="button" class="osg-button osg-button--small osg-button--icon" @click="zoomOut(); $event.target.blur()" title="Zoom out">
          <span class="osg-button__icon osg-icons--minus-sign"></span>
        </a>
        <a aria-role="button" :class="'osg-margin-left-15 osg-button osg-button--small' + ($store.state.component.settings.viewSize.mobile ? ' osg-button--active' : '')" @click="setViewSize('mobile'); $event.target.blur()" title="Small">
          S
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small' + ($store.state.component.settings.viewSize.tablet ? ' osg-button--active' : '')" @click="setViewSize('tablet'); $event.target.blur()" title="Medium">
          M
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small' + ($store.state.component.settings.viewSize.desktop ? ' osg-button--active' : '')" @click="setViewSize('desktop'); $event.target.blur()" title="Large">
          L
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small' + ($store.state.component.settings.viewSize.full ? ' osg-button--active' : '')" @click="setViewSize('full'); $event.target.blur()" title="Fluid">
          %
        </a>
        <a aria-role="button" class="osg-margin-left-15 osg-button osg-button--icon osg-button--small" @click="$store.dispatch('personal/reset'); $event.target.blur()" title="Factory reset">
          <span class="osg-button__icon osg-icons--factory-fill"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker.vue'
export default {
  name: 'ComponentSettings',
  components: { ColorPicker },

  props: {
    devMode: {
      type: Boolean
    },
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
    }
  },

  methods: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
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
            zoom: currentZoom + 25
          }
        })
      }
    },

    zoomOut() {
      let currentZoom = this.$store.state.personal.settings.zoom      
      if (currentZoom > 50) {
        this.$store.dispatch('personal/setValues', {
          settings: {
            zoom: currentZoom - 25
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@use "system/spacing";

.osg-devtools-settings {
  @extend %osg-margin-vertical-15;
}

.osg-devtools-button-list {
  > a {    
    margin-top: 22px
  }
}
</style>
