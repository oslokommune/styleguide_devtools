import eventBus from '../../bus/bus'

/* VIEWBOX STORE */
const state = {
  viewMode: {
    single: true,
    grid: false,
    random: false
  },
  viewSize: {
    mobile: false,
    tablet: false,
    desktop: false,
    full: true
  },
  fullscreen: false,
  ruler: true,
  backgroundColor: '',
  backgroundSolid: false
}

const getters = {}

const actions = {
  setFullscreenMode({commit}, mode) {
    commit('setFullscreen', mode)

    eventBus.$emit('viewBox.setFullscreen', mode)
  },

  setRulerMode({commit}, mode) {
    commit('setRuler', mode)
  },

  setBackgroundSolid({commit}, mode) {
    commit('setSolid', mode)
  },

  setBackgroundColor({commit}, color) {
    commit('setColor', color)
  },

  setViewMode({commit}, mode) {
    commit('clearMode')

    switch (mode) {
      case 'single':
      case 'grid':
      case 'random':
        commit('setMode', mode)
        break
      default:
        return Promise.reject(new Error('Unknown mode'))
    }

    return Promise.resolve(mode)
  },

  setViewSize({commit}, size) {
    commit('clearSize')

    switch (size) {
      case 'mobile':
      case 'tablet':
      case 'desktop':
      case 'full':
        commit('setSize', size)
        break
      default:
        return Promise.reject(new Error('Unknown size'))
    }

    eventBus.$emit('viewBox.setViewSize', size)

    return Promise.resolve(size)
  }
}

const mutations = {
  setFullscreen(state, mode) {
    state.fullscreen = mode
  },

  setRuler(state, mode) {
    state.ruler = mode
  },

  setSolid(state, mode) {
    state.backgroundSolid = !!mode
  },

  setColor(state, color) {
    state.backgroundColor = color
  },

  setMode(state, mode) {
    state.viewMode[mode] = true
  },

  setSize(state, size) {
    state.viewSize[size] = true
  },

  clearSize(state) {
    state.viewSize.mobile = false
    state.viewSize.tablet = false
    state.viewSize.desktop = false
    state.viewSize.full = false
  },

  clearMode(state) {
    state.viewMode.single = false
    state.viewMode.grid = false
    state.viewMode.random = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
