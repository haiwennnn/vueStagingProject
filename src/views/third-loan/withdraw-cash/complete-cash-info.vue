<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header @on-header-back-event="backEvent">信用钱包</z-header>
      <div class="zz-tab__panel complete-cash-info"
        ref="completeCashInfo">
        <input-amount :status="completeStatusStep"
          @on-withdraw-cash-event="withdrawCashEvent"
          :tenor-list="tenorList"></input-amount>
        <bind-bankcard :status="completeStatusStep"
          @on-withdraw-cash-event="withdrawCashEvent"></bind-bankcard>
        <confirm-detail :status="completeStatusStep"
          v-if="+completeStatusStep === 3"
          @on-withdraw-cash-event="withdrawCashEvent"></confirm-detail>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 信用钱包
   * 内部流程
   *  |-填写金额
   *      |-获取试算明细
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
         * 完成步骤状态
         * 1:输入额度选择期限
         * 2:选择银行卡
         */
        completeStatusStep: 1,
        /**
         * 额度获取状态
         * 1:获取中
         * 2:获取失败
         * 3:获取成功
         */
        amountProgressStatus: 3,
        tenorList: [],
        /**
         * 提现信息
         */
        withdrawCashInfo: {
          walletTrialInfo: null,
          userSelectedTenorIndex: null,
          tenor: null,
          bankcard: null
        }
      }
    },
    methods: {
      backEvent() {
        if (this.completeStatusStep === 3) {
          this.completeStatusStep = 2
        } else if (this.completeStatusStep === 2) {
          this.completeStatusStep = 1
        } else {
          this.$router.back()
        }
      },
      goRealAuth() {
        this.$router.push({
          name: 'realnameAuth'
        })
      },
      withdrawCashEvent(data) {
        // this.$router.push({
        //   name: 'faceIdentify'
        // })
        let type = data.type
        let withdrawCashInfo = this.withdrawCashInfo || {}
        if (type === 'inputAmount') {
          withdrawCashInfo.walletTrialInfo = data.data.walletTrialInfo
          withdrawCashInfo.userSelectedTenorIndex = data.data.userSelectedTenorIndex
          withdrawCashInfo.tenor = data.data.tenor
          // this.$set(this.withdrawCashInfo, 'walletTrialInfo', data.data.walletTrialInfo)
          // this.$set(this.withdrawCashInfo, 'userSelectedTenorIndex', data.data.userSelectedTenorIndex)
          // this.$set(this.withdrawCashInfo, 'tenor', data.data.tenor)
          this.completeStatusStep = 2
        } else if (type === 'inputBankcard') {
          withdrawCashInfo.bankcard = data.data.bankcard
          // this.$set(this.withdrawCashInfo, 'bankcard', data.data.bankcard)
          this.completeStatusStep = 3
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.completeCashInfo.scrollTop = this.$refs.completeCashInfo.scrollHeight - this.$refs.completeCashInfo.clientHeight
            }, 300)
          })
        } else {
        }
        this.withdrawCashInfo = withdrawCashInfo
      },
      /**
       * 获取产品期数
       */
      getTenorList() {
        this.$http.post(this.$api.getTenorList).then((res) => {
          if (+res.errorCode === 0) {
            this.tenorList = res.data
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    },
    created() {
      this.getTenorList()
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


