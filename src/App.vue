<template>
  <div id="app">
    <div class="zz-page">
      <router-view/>
      <!-- <div class="zz-page-body">
        <div class="zz-tab">
          <z-header>测试标题</z-header>
          <div class="zz-tab__panel zz-tab__panel_hastabbar"></div>
        </div>
      </div> -->
    </div>
    <div class="zz-page-content"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(this.$test)
    this.$api.getProducts().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less">
@import "./styles/index.less";
</style>
