<template>
  <nav v-if="$store.state.pattern.settings.visible" class="level viewBoxSettings">
    <div class="columns">
      <div class="column">
        <h1 class="osg-heading-1" v-if="$store.state.pattern.settings.sections.title.visible">{{ title|capitalize }}</h1>
      </div>
      <div class="column is-two-thirds button-list osg-text-right chrome" v-if="$store.state.pattern.settings.sections.configuration.visible">
        <chrome v-model="color" />
        <button class="osg-button osg-button--blue-light osg-button--small">
          <i class="fas fa-palette"></i>
        </button>
        <button class="osg-button osg-button--small" :class="{'osg-button--active': backgroundSolid}" @click="toggleSolidState">
          <i class="fas fa-fill"></i>
        </button>
        <button :class="'osg-margin-left-3 osg-button osg-button--small' + (fullscreen ? ' osg-color-bg-blue-dark osg-color-text-white' : '')" @click="toggleFullscreen">
          <i class="fas fa-expand" title="Fullscreen mode"></i>
        </button>
        <button :class="'osg-margin-left-3 osg-button osg-button--small osg-button--blue-light' + ($store.state.pattern.settings.viewSize.mobile ? ' osg-color-bg-blue-dark osg-color-text-white' : '')" @click="setViewSize('mobile')">
          <i class="fas fa-mobile-alt" title="Mobile width"></i>
        </button>
        <button :class="'osg-button osg-button--small osg-button--green-light' + ($store.state.pattern.settings.viewSize.tablet ? ' osg-color-bg-blue-dark osg-color-text-white' : '')" @click="setViewSize('tablet')">
          <i class="fas fa-tablet-alt" title="Tablet width"></i>
        </button>
        <button :class="'osg-button osg-button--small osg-button--yellow' + ($store.state.pattern.settings.viewSize.desktop ? ' osg-color-bg-blue-dark osg-color-text-white' : '')" @click="setViewSize('desktop')">
          <i class="fas fa-desktop" title="Desktop width"></i>
        </button>
        <button :class="'osg-button osg-button--small' + ($store.state.pattern.settings.viewSize.full ? ' osg-color-bg-blue-dark osg-color-text-white' : '')" @click="setViewSize('full')">
          <i class="fas fa-percentage" title="Full width"></i>
        </button>
        <button class="osg-margin-left-3 osg-button osg-button--small osg-button--red" @click="resetToFactoryDefaults">
          <i class="fas fa-industry"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
  import { Chrome } from 'vue-color'

  export default {
    name: 'viewBoxSettings',

    components: { Chrome },

    props: {
      title: {
        type: String,
        required: true
      }
    },

    data: () => ({}),

    computed: {
      color: {
        get: function() {
          return this.$store.state.pattern.settings.backgroundColor
        },
        set: function(value) {
          this.$store.dispatch('pattern/setBackgroundColor', value)
        }
      },

      backgroundSolid: {
        get: function() {
         return this.$store.state.pattern.settings.backgroundSolid
        },
        set: function(value) {
          this.$store.dispatch('pattern/setBackgroundSolid', value)
        }
      },

      fullscreen: {
        get: function() {
          return this.$store.state.pattern.settings.fullscreen
        },
        set: function(value) {
          this.$store.dispatch('pattern/setFullscreenMode', value)
        }
      }
    },

    methods: {
      toggleFullscreen() {
        this.fullscreen = !this.fullscreen
      },

      toggleSolidState() {
        this.backgroundSolid = !this.backgroundSolid
      },

      setViewMode(mode) {
        this.$store.dispatch('pattern/setViewMode', mode)
      },

      setViewSize(size) {
        this.$store.dispatch('pattern/setViewSize', size)
      },

      resetToFactoryDefaults() {
        this.$emit('setPatternValues')
      }
    }
  }
</script>
<style lang="scss" scoped>
.button-list {
  > button {    
    margin-top: 19px
  }
}
</style>
