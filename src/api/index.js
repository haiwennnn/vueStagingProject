import Http from '../lib/http'

import app from './app'
import wallet from './wallet'

const Api = {
  ...app,
  ...wallet
}

/**
 * 装载接口，http方法
 */
export default {
  install(Vue) {
    Vue.prototype.$api = Api
    Vue.prototype.$http = Http
  }
}
