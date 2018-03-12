import Header from './header'

const components = {
  Header
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
  ...components,
  install
}
