<template>
  <div v-if="isLoading">
    <!-- <div class="zz-mask"></div> -->
    <div class="zz-mask zz-mask_transparent"></div>
    <div class="zz-toast">
      <i class="zz-toast-icon zz-toast-loading iconfont icon-loading"></i>
      <!-- <i class="icon iconfont icon-done zz-toast-icon zz-toast-done"></i> -->
      <div class="zz-toast__content">正在加载数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'z-toast',
  data() {
    return {
      isLoading: false
    }
  }
}
</script>
<style lang="less" scoped>

</style>

