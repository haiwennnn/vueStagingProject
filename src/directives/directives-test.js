const install = function (Vue, opts = {}) {
  Vue.directive('test', {
    bind: function (el, binding, vnode) {
      console.log('---bind---')
      console.log(el)
      console.log(binding)
      console.log(vnode)
      console.log('---bind:end---')
    },
    inserted: function (el, binding, vnode) {
      console.log('---inserted---')
      console.log(el)
      console.log(binding)
      console.log(vnode)
      console.log('---inserted:end---')
    },
    update: function (el, binding, vnode) {
      console.log('---update---')
      console.log(el)
      console.log(binding)
      console.log(vnode)
      console.log('---update:end---')
    },
    componentUpdated: function (el, binding, vnode) {
      console.log('---componentUpdated---')
      console.log(el)
      console.log(binding)
      console.log(vnode)
      console.log('---componentUpdated:end---')
    },
    unbind: function (el, binding, vnode) {
      console.log('---unbind---')
      console.log(el)
      console.log(binding)
      console.log(vnode)
      console.log('---unbind:end---')
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
