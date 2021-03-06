// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VConsole from 'vconsole'
import Api from './api'
import Zui from '@/components/index.js'

// 引入测试directive
import DireTest from '@/directives/directives-test'

import plugins from '@/plugins'
import filter from '@/filter'

import FJ from '@/lib/fj'
import './styles/index.less'

window.FJ = FJ
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
Vue.prototype.test = 11
Vue.config.productionTip = false

let env = process.env.NODE_ENV
/* eslint-disable no-new */
// new VConsole()
if (env !== 'production') {
  /* eslint-disable no-new */
  new VConsole()
}

Vue.use(Zui)
Vue.use(Api)
Vue.use(DireTest)

Vue.use(plugins.ToastPlugin)
Vue.use(plugins.AlertPlugin)

filter.init(Vue)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
