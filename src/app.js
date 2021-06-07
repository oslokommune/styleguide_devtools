import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store.js'
import bus from './bus/bus.js'
import './assets/images/favicon.ico'
import EventEmitter from 'webpack/hot/emitter.js'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(VueRouter)

import { routes } from './routes/routes.js'
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
Vue.prototype.$eventEmitter = EventEmitter

new Vue({
  router,
  store
}).$mount('#app')
