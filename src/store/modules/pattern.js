import _ from 'lodash'
import {defaultState} from '../presets/defaultPattern'

/* Pattern Store */
const state = {}

const getters = {}

const actions = {
  setDefaults({commit}) {
    commit('setValues', defaultState)
  },

  setValues({commit}, payload) {
    console.log('values') // eslint-disable-line
    console.log(payload) // eslint-disable-line
    commit('setValues', payload)
  },

  setActiveSection({commit}, section) {
    commit('setActiveSection', section)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
