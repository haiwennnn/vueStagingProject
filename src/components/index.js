import Header from './header'
import Toast from './toast'
import Zdialog from './z-dialog'
import Alert from './alert'
import Confirm from './confirm'
import Popup from './popup'

const components = {
  Header,
  Toast,
  Zdialog,
  Alert,
  Confirm,
  Popup
}

const install = function (Vue, opts = {}) {
  /* install ignore if */
  if (install.installed) return

  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // ...components,
  install
}
