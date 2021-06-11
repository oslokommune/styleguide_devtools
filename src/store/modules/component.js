import _ from 'lodash'
import { defaultState } from '../presets/defaultComponent.js'
import { cleanState } from '../presets/cleanComponent.js'
import { mdState } from '../presets/mdComponent.js'

/* Pattern Store */
const state = {
  settings: {
    visible: true,
    sections: {
      title: {
        visible: true
      },
      configuration: {
        visible: true
      }
    },
    viewSize: {
      mobile: false,
      tablet: false,
      desktop: false,
      full: true
    },
    fullscreen: false,
    backgroundColor: '',
    backgroundSolid: false,
    zoom: 100,
    activeTab: 0
  },
  sections: {
    frame: {
      visible: true
    },
    docs: {
      visible: true
    },
    code: {
      visible: false
    },
    debug: {
      visible: false
    }
  }
}

const getters = {}

const actions = {
  updateValues({ commit, rootState }, payload) {
    commit('setValues', defaultState)
    commit('setValues', rootState.personal)

    if (payload) {
      if (payload.preset) {
        switch (payload.preset) {
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
      if (payload.settings) {
        commit('setValues', {
          settings: payload.settings
        })
      }
      if (payload.sections) {
        commit('setValues', {
          sections: payload.sections
        })
      }
    }
  },

  setDefaults({ commit }) {
    commit('setValues', defaultState)
  },

  setValues({ commit }, payload) {
    commit('setValues', payload)
  }
}

const mutations = {
  setValues(state, payload) {
    state = _.merge(state, payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
