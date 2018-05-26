import Http from '../lib/http'

import app from './app'
import common from './common'
import wallet from './wallet'
import repay from './repay'

const Api = {
  ...app,
  ...common,
  ...wallet,
  ...repay
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
