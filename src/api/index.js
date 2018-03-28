import app from './app'

const Api = {
  ...app
}

export default {
  install(Vue) {
    Vue.prototype.$api = Api
    Vue.api = Api
  }
  // $api: Api
}
