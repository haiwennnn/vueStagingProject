import ToastComponent from '@/components/toast/index.vue'
import { mergeOptions } from '@/lib/plugin-helper'
let $vm

const plugin = {
  install(Vue, options = {}) {
    const Toast = Vue.extend(ToastComponent)

    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const toast = {
      show(options = {}) {
        options.time = options.time === 0 ? options.time : (options.time || 3000)
        options.position = options.position || ''
        options.direction = options.direction || ''
        mergeOptions($vm, options)
        $vm.show = true
      },
      text(text, time = 3000, direction = '') {
        this.show({
          text,
          time,
          direction
        })
      },
      hide() {
        $vm.show = false
      }
    }

    if (!Vue.$zzz) {
      Vue.$zzz = {
        toast
      }
    } else {
      Vue.$zzz.toast = toast
    }

    Vue.mixin({
      created: function () {
        this.$zzz = Vue.$zzz
      }
    })
  }
}

export default plugin
export const install = plugin.install
