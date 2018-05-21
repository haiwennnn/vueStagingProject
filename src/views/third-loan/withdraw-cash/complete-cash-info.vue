<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <input-amount @on-withdraw-cash-event="withdrawCashEvent"></input-amount>
        <bind-bankcard></bind-bankcard>
        <confirm-detail></confirm-detail>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 信用钱包
   * 内部流程
   *  |-填写金额
   *      |-获取试算心细
   *      |-选择借款期数
   *  |-选择银行卡
   *      |-[增加银行卡]
   *  |-勾选协议
   *  |-确认借款信息(生成loanId)
   * @to 人脸识别
   * 字组件交互通过统一方式
   */
  import InputAmount from './withdraw-cash-info/input-amount'
  import BindBankcard from './withdraw-cash-info/bind-bankcard'
  import ConfirmDetail from './withdraw-cash-info/confirm-detail'
  export default {
    components: {
      InputAmount,
      BindBankcard,
      ConfirmDetail
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
      withdrawCashEvent(data) {
        this.$router.push({
          name: 'faceIdentify'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .loan-assess-result-panel {
    width: 5.5rem;
    margin: 1.4rem auto 0;
    text-align: center;
    &.refuse {
      p {
        font-size: 0.26rem;
        color: #666;
        text-align: center;
      }
    }
    &.in-progress {
      .loading-img {
        width: 0.9rem;
        height: 1.1rem;
        margin: 1.4rem auto 0.4rem;
        background-color: #ccc;
      }
      p {
        line-height: 0.4rem;
        margin-top: 0.1rem;
        font-size: 0.24rem;
        color: #999;
      }
    }
  }

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


