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
        @click="confirmOnCancel">{{cancelText}}</div>
      <div class="zz-dialog-btn"
        @click="confirmOnConfirm">{{confirmText}}</div>
    </div>
  </z-dialog>
</template>
<script>
import Zdialog from '../z-dialog'
export default {
  name: 'confirm',
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
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
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
    confirmOnCancel() {
      this.show = false
      this.$emit('on-cancel')
    },
    confirmOnConfirm() {
      this.show = false
      this.$emit('on-confirm')
    }
  }
}
</script>
<style lang="less" scoped>

</style>
