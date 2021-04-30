import _ from 'lodash'
import { defaultState } from '../presets/defaultPattern.js'
import { cleanState } from '../presets/cleanPattern.js'
import { mdState } from '../presets/mdPattern.js'

/* Pattern Store */
const state = {}

const getters = {}

const actions = {
  setPatternValues({ commit, rootState }, payload) {
    commit('setValues', defaultState)
    commit('setValues', rootState.personal)

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
