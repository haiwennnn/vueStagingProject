<template>
  <div class="zz-cell">
    <div class="zz-cell__hd">
      <slot name="hd"></slot>
    </div>
    <div class="zz-cell__bd">
      <slot name="bd"></slot>
    </div>
    <div class="zz-cell__ft">
      <!-- <slot></slot> -->
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Cell',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>

</style>


