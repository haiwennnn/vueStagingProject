<template>
  <z-dialog v-model="show"
    @on-show="$emit('on-show')"
    @on-hide="$emit('on-hide')">
    <div class="zz-dialog__hd">
      <div class="zz-dialog-title">{{title}}</div>
    </div>
    <div class="zz-dialog__bd">
      <slot>
        <div v-html="content"></div>
      </slot>
    </div>
    <div class="zz-dialog__ft">
      <div class="zz-dialog-btn"
        @click="alertOnHide">{{buttonText}}</div>
    </div>
  </z-dialog>
</template>
<script>
  /**
   * Alert弹窗组件
   * @module Alert
   */
  import Zdialog from '../z-dialog'
  export default {
    name: 'alert',
    /**
     * Components 包含子组件
     * @prop {Component} Zdialog dialog弹窗组件
     */
    components: {
      Zdialog
    },
    /**
     * Props 接受父组件的传值
     * @prop {Boolean} value 双向绑定model值
     * @prop {Boolean} mask 是否展示遮罩
     * @prop {String} title 标题
     * @prop {String} content 展示内容
     * @prop {String} buttonText 按钮文本默认'确定'
     */
    props: {
      value: Boolean,
      mask: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '提示'
      },
      content: {
        type: String,
        default: ''
      },
      buttonText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {
        show: false
      }
    },
    computed: {

    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      alertOnHide() {
        this.show = false
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
