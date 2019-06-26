/* Pattern Store */
const defaultState = {
  settings: {
    visible: true,
    sections: {
      title: {
        visible: true
      },
      configuration: {
        visible: true
      }
    }
  },
  sections: {
    docs: {
      visible: true,
      active: true,
      sections: {
        documentation: {
          visible: true
        },
        assets: {
          visible: true
        },
        includes: {
          visible: true
        }
      }
    },
    accessibility: {
      visible: true,
      active: false
    },
    html: {
      visible: true,
      active: false
    },
    twig: {
      visible: true,
      active: false
    },
    json: {
      visible: true,
      active: false
    }
  }
}

const state = {}

const getters = {}

const actions = {
  setDefaults({commit}) {
    commit('setDefaults')
  },

  setValues({commit}, payload) {
    console.log(payload) // eslint-disable-line
    commit('setValues', payload)
  },

  setActiveSection({commit}, section) {
    commit('setActiveSection', section)
  }
}

const mutations = {
  setDefaults(state) { // eslint-disable-line
    state = defaultState // eslint-disable-line
  },

  setActiveSection(state, activeSection) {
    Object.keys(state.sections).forEach(section => {
      state.sections[section].active = section === activeSection
    })
  },

  setValues(state, values) {
    state = Object.assign(state, values)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
