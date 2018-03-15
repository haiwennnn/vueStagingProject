<template>
  <div class="zz-nav">
    <div class="zz-nav__panel">
      <!-- 导航左侧区域 -->
      <div class="zz-nav__left">
        <!-- 存在两种形式按钮 文本和icon 最多两个 -->
        <span class="zz-nav__iconbtn iconfont icon-back"></span>
        <!-- <span class="zz-nav__textbtn">按钮</span> -->
      </div>
      <div class="zz-nav__title">
        <span>
          <slot></slot>
        </span>
      </div>
      <!-- 导航右侧区域 -->
      <div class="zz-nav__right">
        <!-- <span class="zz-nav__textbtn">按钮</span> -->
        <!-- <span class="zz-nav__iconbtn iconfont icon-add"></span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'z-header',
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>

</style>
