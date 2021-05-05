<template>
  <nav v-if="$store.state.component.settings.visible" class="viewBoxSettings osg-margin-bottom-2">
    <div class="columns">
      <div class="column">
        <h1 class="osg-heading-1" v-if="$store.state.component.settings.sections.title.visible">{{ component.name|capitalize }}</h1>
      </div>
      <div class="column is-two-thirds osg-devtools-button-list osg-text-right" v-if="$store.state.component.settings.sections.configuration.visible">
        <color-picker @pick="setColor" />
        <a aria-role="button" :class="'osg-margin-left-3 osg-button osg-button--small' + (fullscreen ? ' osg-button--active' : '')" @click="toggleFullscreen(); $event.target.blur()">
          <i class="fas fa-expand" title="Fullscreen mode"></i>
        </a>
        <a aria-role="button" :class="'osg-margin-left-3 osg-button osg-button--small osg-button--blue-light' + ($store.state.component.settings.viewSize.mobile ? ' osg-button--active' : '')" @click="setViewSize('mobile'); $event.target.blur()">
          <i class="fas fa-mobile-alt" title="Mobile width"></i>
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small osg-button--green-light' + ($store.state.component.settings.viewSize.tablet ? ' osg-button--active' : '')" @click="setViewSize('tablet'); $event.target.blur()">
          <i class="fas fa-tablet-alt" title="Tablet width"></i>
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small osg-button--yellow' + ($store.state.component.settings.viewSize.desktop ? ' osg-button--active' : '')" @click="setViewSize('desktop'); $event.target.blur()">
          <i class="fas fa-desktop" title="Desktop width"></i>
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small' + ($store.state.component.settings.viewSize.full ? ' osg-button--active' : '')" @click="setViewSize('full'); $event.target.blur()">
          <i class="fas fa-percentage" title="Full width"></i>
        </a>
        <a aria-role="button" :class="'osg-margin-left-3 osg-button osg-button--small' + (documentation ? ' osg-button--active' : '')" @click="toggleDocumentation(); $event.target.blur()">
          <i class="fas fa-comment-dots" title="Documentation"></i>
        </a>
        <a aria-role="button" :class="'osg-button osg-button--small' + (code ? ' osg-button--active' : '')" @click="toggleCode(); $event.target.blur()">
          <i class="fas fa-code" title="Code"></i>
        </a>
        <a aria-role="button" class="osg-margin-left-3 osg-button osg-button--small osg-button--red" @click="$store.dispatch('personal/reset'); $event.target.blur()">
          <i class="fas fa-industry"></i>
        </a>
      </div>
    </div>
  </nav>
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

    documentation: {
      get: function() {
        return this.$store.state.personal.sections.docs.visible
      },
      set: function(value) {
        this.$store.dispatch('personal/setValues', {
          sections: {
            docs: {
              visible: value
            }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.osg-devtools-button-list {
  > a {    
    margin-top: 19px
  }
}
</style>
