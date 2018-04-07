import Header from './header'
import Toast from './toast'
import Zdialog from './z-dialog'
import Alert from './alert'
import Confirm from './confirm'
import Popup from './popup'

import Grid from './grid/grid.vue'
import GridItem from './grid/grid-item.vue'

import flexbox from './flexbox/flexbox.vue'
import flexboxItem from './flexbox/flexbox-item.vue'

const components = {
  Header,
  Toast,
  Zdialog,
  Alert,
  Confirm,
  Popup,
  Grid,
  GridItem,
  flexbox,
  flexboxItem
}

const install = function (Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
