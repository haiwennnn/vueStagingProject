import ToastComponent from '@/components/toast/index.vue'
import { mergeOptions } from '@/lib/plugin-helper'
let $vm

/**
 * Toast组件
 * 调用方式this.$zzz.toast.show(option)
 * @param {String}  text       显示文本
 * @param {String}  type       类型 ['loading','done']
 * @param {String}  position   显示位置 ['middle'] 默认显示底部轻度提示
 * @param {Number}  time       显示时长 [0:不自动关闭,default:3000]
 * @param {Boolean} isShowMask 是否显示遮罩层
 * @param {String}  direction  显示方向,签名时全屏并且向右旋转90度 [default:0,90]
 */

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
