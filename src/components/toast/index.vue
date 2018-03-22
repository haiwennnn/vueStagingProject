<template>
  <div>
    <!-- <div class="zz-mask"></div> -->
    <div class="zz-mask zz-mask_transparent" v-if="isShowMask && show"></div>
    <div class="zz-toast" v-show="show" :class="toastClass">
      <i class="zz-toast-icon iconfont icon-loading iconfont_rotate" v-if="type === 'loading'"></i>
      <i class="zz-toast-icon iconfont icon-done" v-if="type === 'done'"></i>
      <div class="zz-toast__content">
        <slot></slot>
      </div>
      <div class="zz-toast__content" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'z-toast',
    data() {
      return {
        show: false,
        timeout: null
      }
    },
    props: {
      value: Boolean,
      time: {
        type: Number,
        default: 3000
      },
      text: String,
      position: {
        type: String,
        default: ''
      },
      type: String,
      isShowMask: {
        type: Boolean,
        default: false
      },
      autoClose: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: ''
      }
    },
    created() {
      if (this.value) {
        this.show = true
      }
    },
    computed: {
      toastClass() {
        return {
          'zz-toast__hint': this.position === '',
          'zz-toast__rotate90': this.direction === '90'
        }
      }
    },
    watch: {
      show(val) {
        console.log(val)
        if (val) {
          this.$emit('input', true)
          this.$emit('on-show')
          clearTimeout(this.timeout)
          if (this.time > 0) {
            this.timeout = setTimeout(() => {
              this.show = false
              this.$emit('input', false)
              this.$emit('on-hide')
            }, this.time)
          }
        }
      },
      value(val) {
        this.show = val
      },
      time(val) {
        console.log(val)
        clearTimeout(this.timeout)
        if (val <= 0) {
        } else {
          this.timeout = setTimeout(() => {
            this.show = false
            this.$emit('input', false)
            this.$emit('on-hide')
          }, val)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  // 处理页面旋转，同时旋转toast对话框样式
  .zz-toast__rotate90 {
    transform: translate(-50%, 50%) rotate(90deg) !important;
  }
  .zz-toast__hint.zz-toast__rotate90 {
    bottom: 50%;
    left: 1.2rem;
  }
</style>
