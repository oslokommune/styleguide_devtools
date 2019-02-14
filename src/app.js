import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHighlightJS from 'vue-highlightjs'
import store from './store/store'
import bus from './bus/bus'

Vue.use(VueRouter)
Vue.use(VueHighlightJS)

import {routes} from './routes/routes'
const router = new VueRouter({
  routes
})

Vue.filter('capitalize', function (value) {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('snakeToRegular', function (value) {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.replace(/_/g, ' ')
})

Vue.prototype.$eventHub = bus

new Vue({
  router,
  store
}).$mount('#app')
