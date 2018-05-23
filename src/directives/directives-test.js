function getTarget (node) {
  if (node === void 0) {
    return document.body
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body
  } else if (typeof node === 'string' && node.indexOf('?') > 0) {
    node = node.split('?')[0]
  }

  if (node === 'body' || node === true) {
    return document.body
  }

  return node instanceof window.Node ? node : document.querySelector(node)
}

const install = function (Vue, opts = {}) {
  Vue.directive('test', {
    bind: function (el, binding, vnode) {
      console.log('---bind---')
      console.log(el)
      console.log(binding)
      console.log(vnode)
      console.log(vnode.context.test)
      console.log('---bind:end---')
    },
    inserted: function (el, { value }, vnode) {
      console.log('---inserted---')
      console.log(el)
      // console.log(binding)
      console.log(vnode)
      el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
      const parentNode = el.parentNode
      // home ?
      var home = document.createComment('')
      var hasMovedOut = false

      if (value !== false) {
        parentNode.replaceChild(home, el) // moving out, el is no longer in the document
        getTarget(value).appendChild(el) // moving into new place
        hasMovedOut = true
      }
      if (!el.__transferDomData) {
        el.__transferDomData = {
          parentNode: parentNode,
          home: home,
          target: getTarget(value),
          hasMovedOut: hasMovedOut
        }
      }
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
