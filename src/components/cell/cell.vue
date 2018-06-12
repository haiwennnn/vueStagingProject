<template>
  <div class="zz-cell"
    :class="className"
    @click="cellItemClick">
    <div class="zz-cell__hd">
      <slot name="hd"></slot>
    </div>
    <div class="zz-cell__bd">
      <slot name="bd"></slot>
    </div>
    <div class="zz-cell__ft">
      <slot name="ft"></slot>
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Cell',
    props: {
      isArrow: Boolean,
      noBottomLine: Boolean,
      value: {
        type: String,
        default: ''
      }
    },
    computed: {
      className() {
        return {
          'zz-cell_access': this.isArrow,
          'zz-cell_no-bottom-line': this.noBottomLine
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      cellItemClick() {
        this.$emit('on-cell-item-click')
      }
    }
  }
</script>
<style lang="less" scoped>
</style>


