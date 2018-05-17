<template>
  <button class="zz-btn"
    :class="btnClass">
    <i class="iconfont icon-loading iconfont_rotate"
      v-if="status === 'loading'"></i>
    <slot></slot>
  </button>
</template>
<script>
  /**
   * 是否将disable和loading分开成两个属性？
   */
  export default {
    name: 'z-button',
    props: {
      // [default,primary,warn]
      type: {
        type: String,
        default: 'default'
      },
      // [disabled,loading]
      status: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      mini: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    computed: {
      btnClass() {
        return {
          'zz-btn_default': this.type === 'default',
          'zz-btn_primary': this.type === 'primary',
          'zz-btn_warn': this.type === 'warn',
          'zz-btn_success': this.type === 'success',
          'zz-btn_loading': this.status === 'loading',
          'zz-btn_disabled': this.status === 'disabled',
          'zz-btn_mini': this.mini
        }
      }
    },
    created() {
      console.log(this.disabled)
    }
  }
</script>
<style lang="less">
</style>
