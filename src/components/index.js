import Header from './header'
import Toast from './toast'
import Zdialog from './z-dialog'
import Alert from './alert'
import Confirm from './confirm'
import Popup from './popup'

import Grid from './grid/grid.vue'
import GridItem from './grid/grid-item.vue'

// import Cells from './cell/cells.vue'
import ZCellCom from './cell/index.js'

import Flexbox from './flexbox/flexbox.vue'
import FlexboxItem from './flexbox/flexbox-item.vue'

import ZFormCom from './form'
import FormItem from './form/form-item.vue'

import Zbutton from './z-button'
import ButtonGroup from './z-button/button-group.vue'

const components = {
  Header,
  Toast,
  Zdialog,
  Alert,
  Confirm,
  Popup,
  Grid,
  GridItem,
  ...ZCellCom,
  Flexbox,
  FlexboxItem,
  ...ZFormCom,
  FormItem,
  Zbutton,
  ButtonGroup
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
