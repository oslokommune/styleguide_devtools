import _ from 'lodash'
import { defaultState } from '../presets/defaultPattern.js'
import { cleanState } from '../presets/cleanPattern.js'
import { mdState } from '../presets/mdPattern.js'
import eventBus from '../../bus/bus.js'


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

  setFullscreenMode({ commit }, mode) {
    commit('setFullscreen', mode)

    eventBus.$emit('componentFrame.setFullscreen', mode)
  },

  setBackgroundSolid({ commit }, mode) {
    commit('setSolid', mode)
  },

  setBackgroundColor({ commit }, color) {
    commit('setColor', color)
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

    eventBus.$emit('componentFrame.setViewSize', size)

    return Promise.resolve(size)
  }
}

const mutations = {
  setValues(state, payload) {
    state = _.merge(state, payload)
  },

  setFullscreen(state, mode) {
    state.settings.fullscreen = mode
  },

  setSolid(state, mode) {
    state.settings.backgroundSolid = !!mode
  },

  setColor(state, color) {
    state.settings.backgroundColor = color
  },

  setSize(state, size) {
    state.settings.viewSize[size] = true
  },

  clearSize(state) {
    state.settings.viewSize.mobile = false
    state.settings.viewSize.tablet = false
    state.settings.viewSize.desktop = false
    state.settings.viewSize.full = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
