<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>额度审批</z-header>
      <div class="zz-tab__panel">
        <common-layout :loan-info="loanInfo"
          :total-amount="totalAmount"
          :uap="true">
          <!-- <div slot="bd"
            class="main-enter-btn"
            @click="goRealAuth">测试额度</div> -->
          <div slot="bd"
            v-if="amountProgressStatus === 1"
            class="loan-assess-result-panel in-progress">
            <div class="loading-img"></div>
            <p style="font-size: .28rem;color: #222;">审核中</p>
            <p>请耐心等待额度测试</p>
          </div>
          <div slot="bd"
            v-if="amountProgressStatus === 2"
            class="loan-assess-result-panel refuse">
            <p>尊敬的客户您好，很抱歉的通知您的测试未通过 您还可以通过我们的app选择其他的借款产品</p>
            <z-button mini
              type="primary"
              style="width:2.5rem;height:.96rem;margin-top:.6rem;margin-right:0;">前往APP</z-button>
          </div>
          <div slot="bd"
            v-if="amountProgressStatus === 3"
            class="loan-assess-result-panel success">
            <z-button mini
              type="primary"
              @click.native="goCash"
              style="width:2.5rem;height:.96rem;margin-top:.6rem;margin-right:0;">前往提现</z-button>
          </div>
          <div slot="bd"
            v-if="amountProgressStatus === 4"
            class="loan-assess-result-panel in-progress">
            <!-- <div class="loading-img"></div> -->
            <p style="padding:.2rem 0;font-size: .3rem;color: #222;">等待放款</p>
            <p>恭喜您提现成功</p>
            <p>银行审批通过后金额将放入您的账户，请耐心等待</p>
          </div>
        </common-layout>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 贷款评估
   * 业务流走向
   *  |-审核中
   *  |-审核失败
   *  |-审核成功
   *  |-等待放款
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
         * 3:获取成功
         * 4:提现成功，等待放款
         * 5:提现失败
         */
        loanInfo: {
          amount: 0,
          maxAmount: 5000,
          repayDateStr: '',
          desStr: '最大额度'
        },
        totalAmount: 0,
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
        // alert(1)
        this.$router.push({
          name: 'completeCashInfo'
        })
      },
      /**
       * 通过决策后获取钱包额度
       */
      walletShowQuota() {
        this.$http.get(this.$api.walletShowQuota).then((res) => {
          if (+res.errorCode === 0) {
            this.totalAmount = res.data.loanLimit
            this.loanInfo.maxAmount = res.data.loanLimit
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      /**
       * 获取钱包提现信息
       */
      getWalletLoanInfo() {
        this.$http.post(this.$api.getWalletLoanInfo).then((res) => {
          if (+res.errorCode === 0) {
            let walletLoanInfo = res.data
            this.loanInfo.amount = walletLoanInfo.applyMoney
            this.loanInfo.desStr = '提现金额'
            window.FJ.setStore('walletLoanInfo', walletLoanInfo)
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    },
    created() {
      let query = this.$route.query
      this.amountProgressStatus = +query.status
      if (this.amountProgressStatus === 3) {
        this.walletShowQuota()
      }
      if (this.amountProgressStatus === 4) {
        this.walletShowQuota()
        this.getWalletLoanInfo()
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
        // height: 1.1rem;
        margin: 1rem auto 0.4rem;
        // background-color: #ccc;
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


