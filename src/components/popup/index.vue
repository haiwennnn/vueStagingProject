<template>
  <div>
    <div class="zz-mask"
      v-if="show"
      @click="clickPopupBlur"></div>
    <transition name="zz-popup-dialog"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div class="zz-popup-dialog"
        :class="`zz-popup-${position}`"
        v-if="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
/**
 * popup定义为弹出层的载体，动画效果在zz-popup中展示
 */
export default {
  name: 'popup',
  props: {
    value: Boolean,
    position: {
      type: String,
      default: 'bottom'
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    }
  },
  computed: {

  },
  watch: {
    show(val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    },
    value(val) {
      this.show = val
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    clickPopupBlur() {
      if (this.hideOnBlur) {
        this.show = false
      }
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
.zz-popup-dialog {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
}
.zz-popup-dialog {
}
</style>


