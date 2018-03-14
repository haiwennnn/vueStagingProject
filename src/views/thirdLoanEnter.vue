<template>
  <div class="zz-page-body signature-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>第三方贷款入口</z-header>
        <div class="zz-tab__panel zz-tab__panel_hastabbar"></div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 第三方贷款入口页面
 */
export default {
  data() {
    return {

    }
  },
  created() {
    this.$api.getToken('N153521352658220').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    console.log('---' + this.test + '---')
  }
}
</script>
<style lang="less" scoped>

</style>


