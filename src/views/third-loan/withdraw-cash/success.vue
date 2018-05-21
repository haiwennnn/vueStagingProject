<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout :uap="true">
          <!-- <div slot="bd"
            class="main-enter-btn"
            @click="goRealAuth">测试额度</div> -->
          <div slot="bd"
            v-if="amountProgressStatus === 2"
            class="loan-assess-result-panel refuse">
            <p>尊敬的客户您好，很抱歉的通知您的测试未通过 您还可以通过我们的app选择其他的借款产品</p>
            <z-button mini
              type="primary"
              style="width:2.5rem;height:.96rem;margin-top:.6rem;margin-right:0;">前往APP</z-button>
          </div>
          <div slot="bd"
            v-if="amountProgressStatus === 1"
            class="loan-assess-result-panel in-progress">
            <div class="loading-img"></div>
            <p style="font-size: .28rem;color: #222;">审核中</p>
            <p>请耐心等待额度测试</p>
          </div>
        </common-layout>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 提现流程完毕等待放款
   */
  import commonLayout from '../components/commonLayout'
  export default {
    components: {
      commonLayout
    },
    data() {
      return {
        /**
         * 额度获取状态
         * 1:获取中
         * 2:获取失败
         * 3：获取成功
         */
        amountProgressStatus: 3
      }
    },
    methods: {
      goRealAuth() {
        this.$router.push({
          name: 'realnameAuth'
        })
      },
      goCash() {
        alert(1)
        this.$router.push({
          name: 'completeCashInfo'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>


