import VToast from './index.vue'

VToast.install = (Vue) => {
  Vue.component(VToast.name, VToast)
}

export default VToast
