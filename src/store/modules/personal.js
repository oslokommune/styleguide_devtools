import _ from 'lodash'
import eventBus from '../../bus/bus.js'

/* Personal store */
const state = {
  settings: {
    viewSize: {
      mobile: false,
      tablet: false,
      desktop: false,
      full: true
    },
    fullscreen: false,
    backgroundColor: '',
    backgroundSolid: false
  },
  sections: {
    docs: {
      visible: true
    },
    code: {
      visible: true
    }
  }
}

const getters = {}

const actions = {
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

    eventBus.$emit('personal.update')

    return Promise.resolve(size)
  },

  setValues({ commit }, payload) {
    commit('setValues', payload)
    eventBus.$emit('personal.update')
  },

  reset({ commit }) {
    commit('setValues', {
      settings: {
        viewSize: {
          mobile: false,
          tablet: false,
          desktop: false,
          full: true
        },
        fullscreen: false,
        backgroundColor: '',
        backgroundSolid: false
      },
      sections: {
        docs: {
          visible: true
        },
        code: {
          visible: true
        }
      }
    })
    eventBus.$emit('personal.update')
  }
}

const mutations = {
  setValues(state, payload) {
    state = _.merge(state, payload)
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
