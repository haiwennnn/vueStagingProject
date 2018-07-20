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
            v-if="amountProgressStatus === 1 && isCalljcStatus"
            class="loan-assess-result-panel in-progress">
            <div class="loading-img"></div>
            <p style="font-size: .28rem;color: #222;">审核中</p>
            <p>请耐心等待额度测试，请两分钟后再次查看</p>
          </div>
          <div slot="bd"
            v-if="amountProgressStatus === 2"
            class="loan-assess-result-panel refuse">
            <p>尊敬的客户您好，很抱歉的通知您的测试未通过 您还可以通过我们的app选择其他的借款产品</p>
            <z-button mini
              type="primary"
              @click="downloadApp"
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
        amountProgressStatus: 3,
        isCalljcStatus: false
      }
    },
    methods: {
      downloadApp: function () {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        let isWeXin = /MicroMessenger/i.test(u)
        console.log(u)
        console.log(isWeXin)
        if (isWeXin) {
          this.noRegisterPopup = false
          location.href = 'http://wxz.myapp.com/16891/B58153DB95BD03257B745C91A7655150.apk?fsname=com.chinacreditech.client_1.3.33_37.apk'
          return
        }
        if (isAndroid) {
          this.noRegisterPopup = false
          location.href = 'http://app.chinacreditech.com/app/download/YunKeDai.apk'
          return
        }
        if (isiOS) {
          this.noRegisterPopup = false
          location.href = 'https://itunes.apple.com/us/app/id1230004311?l=zh&ls=1&mt=8'
        }
      },
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
      goAPP() {

      },
      /**
       * 通过决策后获取钱包额度
       */
      walletShowQuota() {
        this.$http.get(this.$api.walletShowQuota).then((res) => {
          if (+res.errorCode === 0) {
            this.loanInfo.maxAmount = +res.data.loanLimit || 0
            let walletUserInfo = window.FJ.getStore('walletUserInfo')
            walletUserInfo.loanLimit = this.loanInfo.maxAmount
            window.FJ.setStore('walletUserInfo', walletUserInfo)
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
      },
      /**
       * 调用决策
       */
      doDecisionOne() {
        this.$http.post(this.$api.walletDecisionApplyEvent).then((res) => {
          let errorCode = +res.errorCode
          if (errorCode === 0) {
            // this.isCalljcStatus = true
            this.doDecisionTwo()
          } else if (errorCode === -2) {
            this.$zzz.toast.text('您尚未登录，请登录')
          } else if (errorCode === -3) {
            this.$zzz.toast.text('您的尚未实名认证，请去实名认证')
          } else if (errorCode === -5) {
            this.$zzz.toast.text('您的个人资料尚未完成，请补充个人资料')
          } else if (errorCode === -7) {
            // 决策拒绝，跳转到失败页面
            this.isCalljcStatus = true
            this.amountProgressStatus = 2
            // this.$router.push({
            //   name: 'loanAssess',
            //   query: {
            //     status: 2
            //   }
            // })
          } else if (errorCode === -1) {
            this.$zzz.toast.text(res.message)
          } else if (errorCode === 3) {
            this.isCalljcStatus = true
            this.$zzz.toast.text('您的资质正在审批中请稍候重试')
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      doDecisionTwo() {
        this.$http.post(
          this.$api.walletDecisionApproveEvent,
          {
            timeout: 60000
          }
        ).then((res) => {
          let errorCode = +res.errorCode
          if (errorCode === 0) {
            this.isCalljcStatus = true
            this.amountProgressStatus = 3
            this.walletShowQuota()
            this.getWalletLoanInfo()
            // this.$router.replace({
            //   name: 'loanAssess',
            //   query: {
            //     status: 3
            //   }
            // })
          } else if (errorCode === -3) {
            this.$zzz.toast.text('您的尚未实名认证，请去实名认证')
          } else if (errorCode === -5) {
            this.$zzz.toast.text('您的个人资料尚未完成，请补充个人资料')
          } else if (errorCode === -7) {
            // 决策拒绝，跳转到失败页面
            this.isCalljcStatus = true
            this.amountProgressStatus = 2
            // this.$router.replace({
            //   name: 'loanAssess',
            //   query: {
            //     status: 2
            //   }
            // })
          } else if (errorCode === 3) {
            this.$zzz.toast.text('您的资质正在审批中请稍候重试')
          } else if (errorCode === -1) {
            this.$zzz.toast.text(res.message)
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    },
    created() {
      let query = this.$route.query
      this.amountProgressStatus = +query.status
      if (this.amountProgressStatus === 1) {
        this.doDecisionOne()
      }
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


