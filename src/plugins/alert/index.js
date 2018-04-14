import AlertCom from '@/components/alert/index'
import { mergeOptions } from '@/lib/plugin-helper'

let $vm

/**
 * Alert 调用试组件
 */

const plugin = {
  install(Vue, options = {}) {
    const Alert = Vue.extend(AlertCom)
    if (!$vm) {
      $vm = new Alert({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    const alert = {
      show(options = {}) {
        mergeOptions($vm, options)
        this.watcher && this.watcher()
        this.watcher = $vm.$watch('show', (val) => {
          val && options.onShow && options.onShow($vm)
          if (val === false && options.onHide) {
            options.onHide($vm)
            this.watcher && this.watcher()
          }
        })
        $vm.show = true
      },
      hide() {
        $vm.show = false
        this.watcher && this.watcher()
        this.watcher = null
      }
    }
    if (!Vue.$zzz) {
      Vue.$zzz = {
        Alert
      }
    } else {
      Vue.$zzz.alert = alert
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
