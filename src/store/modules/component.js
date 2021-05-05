import _ from 'lodash'
import { defaultState } from '../presets/defaultComponent.js'
import { cleanState } from '../presets/cleanComponent.js'
import { mdState } from '../presets/mdComponent.js'

/* Pattern Store */
const state = {}

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
