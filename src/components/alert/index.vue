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
  import Zdialog from '../z-dialog'
  export default {
    name: 'alert',
    components: {
      Zdialog
    },
    data() {
      return {
        show: false
      }
    },
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
