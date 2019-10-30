<template>
  <nav v-if="$store.state.pattern.settings.visible" class="level viewBoxSettings">
    <div v-if="$store.state.pattern.settings.sections.title.visible" class="level-left">
      <h1 class="osg-u-heading-1">{{ title|capitalize }}</h1>
    </div>
    <div v-if="$store.state.pattern.settings.sections.configuration.visible"  class="level-right">
      <div class="level-item chrome">
        <chrome v-model="color" />
        <div class="buttons has-addons">
          <button class="button">
              <span class="icon">
                <i class="fas fa-palette" title="Background color"></i>
              </span>
              <span class="icon is-small">
                <i class="fas fa-angle-down"><span class="is-sr-only">Background color</span></i>
              </span>
          </button>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button :class="'button' + (fullscreen ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="toggleFullscreen">
              <span class="icon">
                <i class="fas fa-expand" title="Fullscreen mode"><span class="is-sr-only">Fullscreen mode</span></i>
              </span>
          </button>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button :class="'button' + ($store.state.pattern.settings.viewMode.single ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewMode('single')">
              <span class="icon">
                <i class="fas fa-box" title="Normal view"><span class="is-sr-only">Normal view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.pattern.settings.viewMode.grid ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewMode('grid')">
              <span class="icon">
                <i class="fas fa-boxes" title="Grid view"><span class="is-sr-only">Grid view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.pattern.settings.viewMode.random ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewMode('random')">
              <span class="icon">
                <i class="fas fa-box-open" title="Pandoras box"><span class="is-sr-only">Pandoras box</span></i>
              </span>
          </button>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button :class="'button' + ($store.state.pattern.settings.viewSize.mobile ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewSize('mobile')">
              <span class="icon">
                <i class="fas fa-mobile-alt" title="Mobile width"><span class="is-sr-only">Mobile width</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.pattern.settings.viewSize.tablet ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewSize('tablet')">
              <span class="icon">
                <i class="fas fa-tablet-alt" title="Tablet width"><span class="is-sr-only">Tablet width</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.pattern.settings.viewSize.desktop ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewSize('desktop')">
              <span class="icon">
                <i class="fas fa-desktop" title="Desktop width"><span class="is-sr-only">Desktop width</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.pattern.settings.viewSize.full ? ' osg-u-color-bg-blue-dark osg-u-color-text-white' : '')" @click="setViewSize('full')">
              <span class="icon">
                <i class="fas fa-percentage" title="Full width"><span class="is-sr-only">Full width</span></i>
              </span>
          </button>
        </div>
      </div>

      <div v-if="modifiers && modifiers.length > 0" class="level-item">
        <div class="buttons has-addons">
          <div class="dropdown is-right is-hoverable">
            <div class="dropdown-trigger">
              <button class="button">
                <span class="is-sr-only">Modifiers</span>
                <span class="icon is-small">
                  <i class="fas fa-magic" title="Modifiers"></i>
                </span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>

            <div class="dropdown-menu" id="dropdown-menu7" role="menu">
              <div class="dropdown-content">
                <a class="dropdown-item" v-for="(modifier, index) in modifiers">
                  <div class="checkbox">
                    <label :for="'modifier' + index">
                      <input :id="'modifier' + index" type="checkbox" :checked="modifierSelected(modifier)" @change="toggleModifier(modifier)" /> {{ modifier }}
                    </label>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <div class="dropdown is-right is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                <span class="is-sr-only">Settings</span>
                <span class="icon is-small">
                  <i class="fas fa-cog" title="Settings"></i>
                </span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu6" role="menu">
              <div class="dropdown-content">
                <a class="dropdown-item" @click="toggleSolidState">
                  <div class="checkbox">
                    <label for="solidBackground">
                      <input type="checkbox" id="solidBackground" v-model="backgroundSolid" /> Solid background
                    </label>
                  </div>
                </a>
                <a class="dropdown-item" @click="toggleRuler">
                  <div class="checkbox">
                    <label for="showRuler">
                      <input type="checkbox" id="showRuler" v-model="ruler" /> Show ruler
                    </label>
                  </div>
                </a>
                <a class="dropdown-item" @click="toggleContentPlaceholders">
                  <div class="checkbox">
                    <label for="showContentPlaceholders">
                      <input type="checkbox" id="showContentPlaceholders" v-model="contentPlaceholders" /> Show content placeholders
                    </label>
                  </div>
                </a>
                <hr class="dropdown-divider">
                <a class="dropdown-item" @click="resetToFactoryDefaults">
                  Reset to factory defaults
                </a>
              </div>
            </div>
          </div>
        </div>
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
      },
      modifiers: {
        type: Array,
        required: false
      }
    },

    data: () => ({}),

    watch: {
      $route () {
        this.$store.state.pattern.settings.selectedModifiers = []
      }
    },

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

      ruler: {
        get: function() {
          return this.$store.state.pattern.settings.ruler
        },
        set: function(value) {
          this.$store.dispatch('pattern/setRulerMode', value)
        }
      },

      contentPlaceholders: {
        get: function() {
          return this.$store.state.pattern.settings.contentPlaceholders
        },
        set: function(value) {
          this.$store.dispatch('pattern/setContentPlaceholdersMode', value)
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

      toggleRuler() {
        this.ruler = !this.ruler
      },

      toggleContentPlaceholders() {
        this.contentPlaceholders = !this.contentPlaceholders
      },

      setViewMode(mode) {
        this.$store.dispatch('pattern/setViewMode', mode)
      },

      setViewSize(size) {
        this.$store.dispatch('pattern/setViewSize', size)
      },

      toggleModifier(modifier) {
        this.$store.dispatch('pattern/toggleModifier', modifier)
      },

      modifierSelected(modifier) {
        return this.$store.state.pattern.settings.selectedModifiers.includes(modifier)
      },

      resetToFactoryDefaults() {
        this.$emit('setPatternValues')
      }
    }
  }
</script>
