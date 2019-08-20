import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import pattern from './modules/pattern'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pattern
  },
  plugins: [
    createPersistedState({
      key: 'oslo_styleguide_store'
    })
  ]
})

export default store
