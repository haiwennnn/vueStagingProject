<template>
  <div class="zz-btn-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'button-group'
}
</script>
<style lang="less" scoped>
.zz-btn-group {
  .zz-btn {
    width: auto;
    display: inline-block;
  }
}
</style>


