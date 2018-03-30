<template>
  <div class="zz-dialog-panel">
    <div class="zz-mask"
      v-show="mask && show"></div>
    <transition name="zz-dialog"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut">
      <div class="zz-dialog"
        v-show="show">
        <div class="zz-dialog-close">x</div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'z-dialog',
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
      }
    },
    computed: {

    },
    watch: {
      show(val) {
        console.log(val + '---')
        if (val) {
          this.$emit('input', true)
          this.$emit('on-show')
        }
      },
      value(val) {
        console.log(val + '------')
        this.show = val
      }
    },
    created() {
      console.log(this.value + '---created---')
      if (this.value) {
        this.show = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .custom-classes-transition {
  }
</style>


