<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout :uap="true">
          <div slot="bd"
            class="main-enter-btn"
            @click="goRealAuth">测试额度</div>
        </common-layout>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 信用钱包主页面
   * 查询用户当前状态
   * 根据不同状态或者业务跳转不同页面
   * 业务流走向
   *  |-获取额度
   *  |-提现操作
   *  |-还款页面
   */
  import commonLayout from '../components/commonLayout'
  export default {
    components: {
      commonLayout
    },
    data() {
      return {}
    },
    methods: {
      goRealAuth() {
        this.$router.push({
          name: 'realnameAuth'
        })
      },
      getUserWalletStatus() {
        this.$http.get(this.$api.walletQueryNode).then((res) => {
          console.log(res)
        })
      }
    },
    created() {
      this.getUserWalletStatus()
    }
  }
</script>
<style lang="less" scoped>
  .main-enter-btn {
    width: 2.6rem;
    height: 0.96rem;
    line-height: 0.96rem;
    margin: 2rem auto 0;
    color: #444;
    font-size: 0.32rem;
    text-align: center;
    background-color: #f9ca1a;
  }
</style>


