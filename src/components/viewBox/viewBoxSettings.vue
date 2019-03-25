<template>
  <nav class="level viewBoxSettings">
    <div class="level-left">
      <h3 class="level-item title is-3">{{ title|capitalize }}</h3>
    </div>
    <div class="level-right">
      <div class="level-item chrome">
        <chrome v-model="color" />
        <div class="buttons has-addons">
          <button class="button">
              <span class="icon">
                <i class="fas fa-palette" title="Palette"></i>
              </span>
              <span class="icon is-small">
                <i class="fas fa-angle-down"><span class="is-sr-only">Palette</span></i>
              </span>
          </button>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button :class="'button' + (fullscreen ? ' is-info' : '')" @click="toggleFullscreen">
              <span class="icon">
                <i class="fas fa-expand" title="Expand view"><span class="is-sr-only">Expand view</span></i>
              </span>
          </button>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button :class="'button' + ($store.state.viewBox.viewMode.single ? ' is-info' : '')" @click="setViewMode('single')">
              <span class="icon">
                <i class="fas fa-box" title="Normal view"><span class="is-sr-only">Normal view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.viewBox.viewMode.grid ? ' is-info' : '')" @click="setViewMode('grid')">
              <span class="icon">
                <i class="fas fa-boxes" title="Grid view"><span class="is-sr-only">Grid view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.viewBox.viewMode.random ? ' is-info' : '')" @click="setViewMode('random')">
              <span class="icon">
                <i class="fas fa-box-open" title="Pandora box"><span class="is-sr-only">Pandora box</span></i>
              </span>
          </button>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <button :class="'button' + ($store.state.viewBox.viewSize.mobile ? ' is-info' : '')" @click="setViewSize('mobile')">
              <span class="icon">
                <i class="fas fa-mobile-alt" title="Mobile view"><span class="is-sr-only">Mobile view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.viewBox.viewSize.tablet ? ' is-info' : '')" @click="setViewSize('tablet')">
              <span class="icon">
                <i class="fas fa-tablet-alt" title="Tablet view"><span class="is-sr-only">Tablet view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.viewBox.viewSize.desktop ? ' is-info' : '')" @click="setViewSize('desktop')">
              <span class="icon">
                <i class="fas fa-desktop" title="Desktop view"><span class="is-sr-only">Desktop view</span></i>
              </span>
          </button>
          <button :class="'button' + ($store.state.viewBox.viewSize.full ? ' is-info' : '')" @click="setViewSize('full')">
              <span class="icon">
                <i class="fas fa-percentage" title="Full view"><span class="is-sr-only">Full view</span></i>
              </span>
          </button>
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
      }
    },

    data: () => ({}),

    computed: {
      color: {
        get: function() {
          return this.$store.state.viewBox.backgroundColor
        },
        set: function(value) {
          this.$store.dispatch('viewBox/setBackgroundColor', value)
        }
      },

      backgroundSolid: {
        get: function() {
         return this.$store.state.viewBox.backgroundSolid
        },
        set: function(value) {
          this.$store.dispatch('viewBox/setBackgroundSolid', value)
        }
      },

      ruler: {
        get: function() {
          return this.$store.state.viewBox.ruler
        },
        set: function(value) {
          this.$store.dispatch('viewBox/setRulerMode', value)
        }
      },

      fullscreen: {
        get: function() {
          return this.$store.state.viewBox.fullscreen
        },
        set: function(value) {
          this.$store.dispatch('viewBox/setFullscreenMode', value)
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

      setViewMode(mode) {
        this.$store.dispatch('viewBox/setViewMode', mode)
      },

      setViewSize(size) {
        this.$store.dispatch('viewBox/setViewSize', size)
      },

      resetToFactoryDefaults() {
        localStorage.removeItem('oslo_styleguide_store')
        location.reload()
      }
    }
  }
</script>
