// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
// import VConsole from 'vconsole'
import api from './api'
import Zui from '@/components/index.js'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

let env = process.env.NODE_ENV

if (env !== 'production') {
  /* eslint-disable no-new */
  // new VConsole()
}
Vue.use(Zui)
Vue.use(api)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
