// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VConsole from 'vconsole'
import http from './plugins/http'
import api from './api'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

let env = process.env.NODE_ENV

console.log('--apiServer--' + process.env.API_ENV)

if (env === 'production') {
  /* eslint-disable no-new */
  new VConsole()
}

Vue.use(http)
Vue.use(api)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
