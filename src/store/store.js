import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import component from './modules/component.js'
import personal from './modules/personal.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    component,
    personal
  },
  plugins: [
    createPersistedState({
      key: 'oslo_styleguide_store'
    })
  ]
})

export default store
