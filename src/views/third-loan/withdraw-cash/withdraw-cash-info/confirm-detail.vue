<template>
  <div class="confirm-detail-panel"
    v-if="isShow">
    <div class="confirm-detail-area">
      <div class="title">
        信息确认
      </div>
      <div class="confirm-detail-item">
        <span class="title">借款金额</span>
        <span class="content">&yen;{{withdrawCashInfo.walletTrialInfo.loanMoney}}</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">还款期数</span>
        <span class="content">{{withdrawCashInfo.walletTrialInfo.term}}</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">收款账户</span>
        <span class="content">{{withdrawCashInfo.bankcard.bankName}}({{withdrawCashInfo.bankcard.bankCardNo | bankcard4No }})</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">每月还款</span>
        <span class="content">&yen;{{withdrawCashInfo.walletTrialInfo.monthlyAmount}}</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">借款人姓名</span>
        <span class="content">{{userInfo.userName}}</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">借款人身份证</span>
        <span class="content">{{userInfo.idNo}}</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">还款账户</span>
        <span class="content">{{withdrawCashInfo.bankcard.bankName}}({{withdrawCashInfo.bankcard.bankCardNo | bankcard4No }})</span>
      </div>
    </div>
    <div class="next-btn">
      <z-button type="primary"
        @click="nextBtnClick">下一步</z-button>
    </div>
  </div>
</template>
<script>
  /**
   * 提现详情
   */
  export default {
    props: {
      status: [String, Number]
    },
    data() {
      return {
        withdrawCashInfo: {},
        userInfo: {}
      }
    },
    computed: {
      isShow() {
        if (+this.status !== 3) {
          return false
        }
        return true
      }
    },
    methods: {
      walletDecisionTienocardevent() {
        this.$http.post(this.$api.walletDecisionTienocardevent).then((res) => {
          if (+res.errorCode === 0) {
            this.$zzz.toast.text('订单创建成功')
            // 创建订单成功，进行签名
            setTimeout(() => {
              this.$router.replace({
                name: 'signature'
              })
            }, 1500)
          } else {
            this.$zzz.toast.text(res.message)
            setTimeout(() => {
              this.$router.replace({
                name: 'loanAssess',
                query: {
                  status: 2
                }
              })
            }, 1000)
          }
        })
      },
      confirmLoan() {
        this.$http.post(this.$api.confirmLoan, {
          data: {
            receiveBankName: this.withdrawCashInfo.bankcard.bankName,
            receiveAcct: this.withdrawCashInfo.bankcard.bankCardNo,
            receiveAcctName: this.userInfo.userName,
            applyMoney: this.withdrawCashInfo.walletTrialInfo.loanMoney + '',
            tenor: this.withdrawCashInfo.walletTrialInfo.term
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            this.walletDecisionTienocardevent()
            // this.$zzz.toast.text('订单创建成功')
            // setTimeout(() => {
            //   this.$router.replace({
            //     name: 'xxx'
            //   })
            // }, 1000)
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      nextBtnClick() {
        this.confirmLoan()
      }
    },
    created() {
      this.withdrawCashInfo = this.$parent.withdrawCashInfo
      this.userInfo = window.FJ.getStore('walletUserInfo')
    }
  }
</script>
<style lang="less" scoped>
  .confirm-detail-area {
    background-color: #fff;
    padding: 0.6rem;
    .title {
      padding-bottom: 0.6rem;
      font-size: 0.28rem;
      color: #999;
    }
  }
  .confirm-detail-item {
    line-height: 0.7rem;
    font-size: 0.28rem;
    color: #444;
    .title {
      display: inline-block;
      padding-bottom: 0;
      // padding-left: .6rem;
      width: 2.5rem;
      color: #666;
    }
  }
  .next-btn {
    height: 1rem;
    .zz-btn {
      height: 100%;
    }
  }
</style>


