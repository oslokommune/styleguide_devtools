<template>
  <nav v-if="$store.state.pattern.settings.visible" class="viewBoxSettings osg-margin-bottom-2">
    <div class="columns">
      <div class="column">
        <h1 class="osg-heading-1" v-if="$store.state.pattern.settings.sections.title.visible">{{ pattern.name|capitalize }}</h1>
      </div>
      <div class="column is-two-thirds button-list osg-text-right chrome" v-if="$store.state.pattern.settings.sections.configuration.visible">
        <button class="osg-button osg-button--blue-light osg-button--small osg-dt-color-btn">
          <i class="fas fa-palette"></i>
          <ul class="osg-dt-color-list">
            <li class="transparent" @click="color = ''; backgroundSolid = false"></li>
            <li class="white" @click="color = '#ffffff'; backgroundSolid = true"></li>
            <li class="black" @click="color = '#000000'; backgroundSolid = true"></li>
            <li class="yellow" @click="color = '#f9c66b'; backgroundSolid = true"></li>
            <li class="red" @click="color = '#ff8274'; backgroundSolid = true"></li>
            <li class="blue-dark" @click="color = '#2a2859'; backgroundSolid = true"></li>
            <li class="blue" @click="color = '#6fe9ff'; backgroundSolid = true"></li>
            <li class="blue-light" @click="color = '#b3f5ff'; backgroundSolid = true"></li>
            <li class="blue-contrast" @click="color = '#1f42aa'; backgroundSolid = true"></li>
            <li class="beige-dark" @click="color = '#d0bfae'; backgroundSolid = true"></li>
            <li class="beige" @click="color = '#f8f0dd'; backgroundSolid = true"></li>
            <li class="green-dark" @click="color = '#034b45'; backgroundSolid = true"></li>
            <li class="green" @click="color = '#43f8b6'; backgroundSolid = true"></li>
            <li class="green-light" @click="color = '#c7f6c9'; backgroundSolid = true"></li>
            <li class="gray-dark" @click="color = '#2c2c2c'; backgroundSolid = true"></li>
            <li class="gray" @click="color = '#f2f2f2'; backgroundSolid = true"></li>
            <li class="gray-light" @click="color = '#f9f9f9'; backgroundSolid = true"></li>
            <li class="purple" @click="color = '#8d50b1'; backgroundSolid = true"></li>
            <li class="purple-light" @click="color = '#e0adff'; backgroundSolid = true"></li>
            <li class="grayscale-10" @click="color = '#e6e6e6'; backgroundSolid = true"></li>
            <li class="grayscale-20" @click="color = '#cccccc'; backgroundSolid = true"></li>
            <li class="grayscale-30" @click="color = '#b3b3b3'; backgroundSolid = true"></li>
            <li class="grayscale-40" @click="color = '#999999'; backgroundSolid = true"></li>
            <li class="grayscale-50" @click="color = 'gray'; backgroundSolid = true"></li>
            <li class="grayscale-60" @click="color = '#666666'; backgroundSolid = true"></li>
            <li class="grayscale-70" @click="color = '#4d4d4d'; backgroundSolid = true"></li>
            <li class="grayscale-80" @click="color = '#333333'; backgroundSolid = true"></li>
            <li class="grayscale-90" @click="color = '#1a1a1a'; backgroundSolid = true"></li>
          </ul>
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
        <button :class="'osg-margin-left-3 osg-button osg-button--small' + ($store.state.pattern.sections.docs.visible ? ' osg-color-bg-blue-contrast osg-color-text-white' : '')" @click="toggleDocumentation">
          <i class="fas fa-comment-dots" title="Documentation"></i>
        </button>
        <button :class="'osg-button osg-button--small' + ($store.state.pattern.sections.code.visible ? ' osg-color-bg-blue-contrast osg-color-text-white' : '')" @click="toggleCode">
          <i class="fas fa-code" title="Code"></i>
        </button>
        <button class="osg-margin-left-3 osg-button osg-button--small osg-button--red" @click="resetToFactoryDefaults">
          <i class="fas fa-industry"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ComponentSettings',

  props: {
    pattern: {
      type: Object,
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
    },

    documentation: {
      get: function() {
        return this.$store.state.pattern.sections.docs.visible
      },
      set: function(value) {
        this.$store.dispatch('pattern/setValues', {
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
        return this.$store.state.pattern.sections.code.visible
      },
      set: function(value) {
        this.$store.dispatch('pattern/setValues', {
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
      this.$store.dispatch('pattern/setViewSize', size)
    },

    resetToFactoryDefaults() {
      this.$emit('setPatternValues')
    }
  }
}
</script>
<style lang="scss" scoped>
@use "system/colors";

.button-list {
  > button {    
    margin-top: 19px
  }
}

.osg-dt-color-btn {
  position: relative;

  &:hover {
    .osg-dt-color-list {
      display: flex;
    }
  }

  .osg-dt-color-list {
    display: none;
    position: absolute;
    left: -2px;
    top: 36px;
    background-color: colors.$gray-light;
    padding: 10px;
    text-align: left;
    flex-wrap: wrap;
    width: 180px;
    z-index: 9999;

    li {
      width: 32px;
      height: 32px;

      &:hover {
        border: 2px solid colors.$blue-contrast !important;
      }

      &.transparent {
        background-image: linear-gradient(45deg, #eaeaea 25%, transparent 25%), linear-gradient(-45deg, #eaeaea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eaeaea 75%), linear-gradient(-45deg, transparent 75%, #eaeaea 75%);
        background-size: 10px 10px;
        background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
      }
      &.white {
        @extend %osg-color-bg-white;
        border: 2px solid colors.$white;
      }
      &.black {
        @extend %osg-color-bg-black;
        border: 2px solid colors.$black;
      }
      &.yellow {
        @extend %osg-color-bg-yellow;
        border: 2px solid colors.$yellow;
      }
      &.red {
        @extend %osg-color-bg-red;
        border: 2px solid colors.$red;
      }
      &.blue-dark {
        @extend %osg-color-bg-blue-dark;
        border: 2px solid colors.$blue-dark;
      }
      &.blue {
        @extend %osg-color-bg-blue;
        border: 2px solid colors.$blue;
      }
      &.blue-light {
        @extend %osg-color-bg-blue-light;
        border: 2px solid colors.$blue-light;
      }
      &.blue-contrast {
        @extend %osg-color-bg-blue-contrast;
        border: 2px solid colors.$blue-contrast;
      }
      &.beige-dark {
        @extend %osg-color-bg-beige-dark;
        border: 2px solid colors.$beige-dark;
      }
      &.beige {
        @extend %osg-color-bg-beige;
        border: 2px solid colors.$beige;
      }
      &.green-dark {
        @extend %osg-color-bg-green-dark;
        border: 2px solid colors.$green-dark;
      }
      &.green {
        @extend %osg-color-bg-green;
        border: 2px solid colors.$green;
      }
      &.green-light {
        @extend %osg-color-bg-green-light;
        border: 2px solid colors.$green-light;
      }
      &.gray-dark {
        @extend %osg-color-bg-gray-dark;
        border: 2px solid colors.$gray-dark;
      }
      &.gray {
        @extend %osg-color-bg-gray;
        border: 2px solid colors.$gray;
      }
      &.gray-light {
        @extend %osg-color-bg-gray-light;
        border: 2px solid colors.$gray-light;
      }
      &.purple {
        @extend %osg-color-bg-purple;
        border: 2px solid colors.$purple;
      }
      &.purple-light {
        @extend %osg-color-bg-purple-light;
        border: 2px solid colors.$purple-light;
      }
      &.grayscale-10 {
        @extend %osg-color-bg-grayscale-10;
        border: 2px solid colors.$grayscale-10;
      }
      &.grayscale-20 {
        @extend %osg-color-bg-grayscale-20;
        border: 2px solid colors.$grayscale-20;
      }
      &.grayscale-30 {
        @extend %osg-color-bg-grayscale-30;
        border: 2px solid colors.$grayscale-30;
      }
      &.grayscale-40 {
        @extend %osg-color-bg-grayscale-40;
        border: 2px solid colors.$grayscale-40;
      }
      &.grayscale-50 {
        @extend %osg-color-bg-grayscale-50;
        border: 2px solid colors.$grayscale-50;
      }
      &.grayscale-60 {
        @extend %osg-color-bg-grayscale-60;
        border: 2px solid colors.$grayscale-60;
      }
      &.grayscale-70 {
        @extend %osg-color-bg-grayscale-70;
        border: 2px solid colors.$grayscale-70;
      }
      &.grayscale-80 {
        @extend %osg-color-bg-grayscale-80;
        border: 2px solid colors.$grayscale-80;
      }
      &.grayscale-90 {
        @extend %osg-color-bg-grayscale-90;
        border: 2px solid colors.$grayscale-90;
      }
    }
  }
}
</style>
