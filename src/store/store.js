import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import viewBox from './modules/viewBox'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'viewBox': viewBox
  },
  plugins: [
    createPersistedState({
      key: 'oslo_styleguide_store'
    })
  ]
})

export default store
