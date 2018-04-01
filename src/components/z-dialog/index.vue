<template>
  <div class="zz-dialog-panel">
    <transition name="zz-mask"
    enter-active-class=""
    leave-active-class="">
      <div class="zz-mask"
        v-show="mask && show"></div>
    </transition>
    <transition name="zz-dialog"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut">
      <div class="zz-dialog"
        v-show="show">
        <!-- <div class="zz-dialog-close">x</div> -->
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
      this.$emit(val ? 'on-show' : 'on-hide')
    },
    value(val) {
      this.show = val
    }
  },
  created() {
    if (this.value) {
      this.show = true
    }
  }
}
</script>
<style lang="less" scoped>
</style>


