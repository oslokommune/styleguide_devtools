import _ from 'lodash'
import { defaultState } from '../presets/defaultPattern'
import { cleanState } from '../presets/cleanPattern'
import { mdState } from '../presets/mdPattern'
import eventBus from '../../bus/bus'


/* Pattern Store */
const state = {}

const getters = {}

const actions = {
  setPatternValues({ commit }, payload) {
    commit('setValues', defaultState)

    if (payload && payload.devtools) {
      if (payload.devtools.preset) {
        switch (payload.devtools.preset) {
          case 'clean':
            commit('setValues', cleanState)
            break
          case 'md':
            commit('setValues', mdState)
            break
          default:
            commit('setDefaults', defaultState)
        }
      }
      if (payload.devtools) {
        commit('setValues', payload.devtools)
      }
    }
  },

  setDefaults({ commit }) {
    commit('setValues', defaultState)
  },

  setValues({ commit }, payload) {
    commit('setValues', payload)
  },

  setActiveSection({ commit }, section) {
    commit('setActiveSection', section)
  },

  setFullscreenMode({ commit }, mode) {
    commit('setFullscreen', mode)

    eventBus.$emit('viewBox.setFullscreen', mode)
  },

  setRulerMode({ commit }, mode) {
    commit('setRuler', mode)
  },

  setBackgroundSolid({ commit }, mode) {
    commit('setSolid', mode)
  },

  setBackgroundColor({ commit }, color) {
    commit('setColor', color)
  },

  setViewMode({ commit }, mode) {
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

  setViewSize({ commit }, size) {
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
  setActiveSection(state, activeSection) {
    Object.keys(state.sections).forEach(section => {
      state.sections[section].active = section === activeSection
    })
  },

  setValues(state, payload) {
    state = _.merge(state, payload)
  },

  setFullscreen(state, mode) {
    state.settings.fullscreen = mode
  },

  setRuler(state, mode) {
    state.settings.ruler = mode
  },

  setSolid(state, mode) {
    state.settings.backgroundSolid = !!mode
  },

  setColor(state, color) {
    state.settings.backgroundColor = color
  },

  setMode(state, mode) {
    state.settings.viewMode[mode] = true
  },

  setSize(state, size) {
    state.settings.viewSize[size] = true
  },

  clearSize(state) {
    state.settings.viewSize.mobile = false
    state.settings.viewSize.tablet = false
    state.settings.viewSize.desktop = false
    state.settings.viewSize.full = false
  },

  clearMode(state) {
    state.settings.viewMode.single = false
    state.settings.viewMode.grid = false
    state.settings.viewMode.random = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
