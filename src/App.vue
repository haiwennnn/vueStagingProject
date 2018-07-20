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
    <div class="zz-page-content">
      <!-- <div class="zz-dialog">
        <div class="zz-dialog-hd">
          <span>dialog标题</span>
          <i class="icon ion-ios-close-outline zz-dialog-close"></i>
        </div>
        <div class="zz-dialog-bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
        <div class="zz-dialog-ft">
          <a href="javascript:;" class="zz-dialog-btn">辅助操作</a>
          <a href="javascript:;" class="zz-dialog-btn">主操作</a>
          <a href="javascript:;" class="zz-dialog-btn zz-dialog-btn-warn">其他操作</a>
        </div>
      </div> -->
      <!-- <div class="zz-mask"></div>
      <div class="zz-toast">
        <i class="zz-toast-icon zz-toast-loading iconfont icon-loading"></i>
        <i class="icon iconfont icon-done zz-toast-icon zz-toast-done"></i>
        <div class="zz-toast__content">正在加载数据</div>
      </div> -->
      <!-- <div class="zz-dialog">
        <div class="zz-dialog-hd">
          <span>dialog标题</span>
          <i class="icon ion-ios-close-outline zz-dialog-close"></i>
        </div>
        <div class="zz-dialog-bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
        <div class="zz-dialog-ft">
          <a href="javascript:;" class="zz-dialog-btn">辅助操作</a>
          <a href="javascript:;" class="zz-dialog-btn">主操作</a>
          <a href="javascript:;" class="zz-dialog-btn zz-dialog-btn-warn">其他操作</a>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {
      // test() {
      //   alert(1)
      // }
    },
    created() {
      // console.log(this.$test)
      // this.$api.getToken('N153521352658220').then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      //  = {

      //   showHead: showHead
      // }
      // let query = this.$route.query
      // window.FJ.setStore('walletAppInfo', walletAppInfo)
      // let vm = this
      // this.$zzz.alert.show({
      //   content: '恭喜还款成功',
      //   onHide() {
      //     vm.test()
      //   }
      // })
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .test-class {
  }
</style>
