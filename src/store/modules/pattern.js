import _ from 'lodash'
import {defaultState} from '../presets/defaultPattern'
import eventBus from '../../bus/bus'

/* Pattern Store */
const state = {}

const getters = {}

const actions = {
  setDefaults({commit}) {
    commit('setValues', defaultState)
  },

  setValues({commit}, payload) {
    commit('setValues', payload)
  },

  setTempSettings({commit}, payload) {
    commit('setTempSettings', payload)
  },

  setActiveSection({commit}, section) {
    commit('setActiveSection', section)
  },

  setFullscreenMode({commit}, mode) {
    commit('setFullscreen', mode)

    eventBus.$emit('viewBox.setFullscreen', mode)
  },

  setRulerMode({commit}, mode) {
    commit('setRuler', mode)
  },

  setContentPlaceholdersMode({commit}, mode) {
    commit('setContentPlaceholders', mode)
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
  },

  toggleModifier({commit}, modifier) {
    commit('toggleModifier', modifier)
  },

  resetModifiers({commit}) {
    commit('toggleModifier')
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

  setTempSettings(state, payload) {
    state.tempSettings = _.cloneDeep(payload)
  },

  setFullscreen(state, mode) {
    state.settings.fullscreen = mode
  },

  setRuler(state, mode) {
    state.settings.ruler = mode
  },

  setContentPlaceholders(state, mode) {
    state.settings.contentPlaceholders = mode
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
  },

  toggleModifier(state, modifier) {
    const {settings} = state
    if (settings.selectedModifiers.includes(modifier)) {
      settings.selectedModifiers = settings.selectedModifiers.filter(e => e !== modifier)
    } else {
      settings.selectedModifiers.push(modifier)
    }
  },

  resetModifiers(state) {
    state.settings.selectedModifiers = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
