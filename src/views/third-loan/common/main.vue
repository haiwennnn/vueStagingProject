<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout :uap="true"
          :total-amount="totalAmount"
          :loan-info="loanInfo">
          <div slot="bd"
            class="main-enter-btn"
            @click="enterBtnEvent">{{enterBtnText}}</div>
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
      return {
        loanInfo: {
          amount: 0,
          maxAmount: 5000,
          repayAmount: 0,
          repayDateStr: '',
          desStr: '最高额度'
        },
        // 用户当前状态,
        userStatus: '',
        enterBtnText: '',
        totalAmount: 0
      }
    },
    methods: {
      /**
       * 获取钱包贷款信息
       * 申请额度
       */
      getWalletLoanInfo() {
        this.$http.post(this.$api.getWalletLoanInfo).then((res) => {
          if (+res.errorCode === 0) {
            let walletLoanInfo = res.data
            // this.totalAmount = res.data.applyMoney
            this.loanInfo.amount = +res.data.loanLimit || 0
            this.loanInfo.desStr = '提现金额'
            window.FJ.setStore('walletLoanInfo', walletLoanInfo)
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      /**
       * 获取额度
       */
      walletShowQuota() {
        this.$http.post(this.$api.walletShowQuota).then((res) => {
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
      // 去实名认证
      goRealAuth() {
        this.$router.push({
          name: 'realnameAuth'
        })
      },
      // 去完成资料
      goAddinfo() {
        this.$router.push({
          name: 'addInfo'
        })
      },
      goWaitCalAmount() {
        this.$router.push({
          name: 'loanAssess',
          query: {
            status: 1
          }
        })
      },
      goWithdrawCash() {
        this.$router.push({
          name: 'completeCashInfo'
        })
      },
      /**
       * 去签名
       */
      goSign() {
        this.$router.push({
          name: 'withdrawCashSignature',
          query: {
            // origin: 'wallet'
          }
        })
      },
      /**
       * 去人脸识别
       */
      goFaceId() {
        this.$router.push({
          name: 'faceIdentify'
        })
      },
      /**
       * 入口按钮事件
       */
      enterBtnEvent() {
        switch (this.userStatus) {
          case 'W01':
            this.goRealAuth()
            break
          case 'W02':
          case 'W03':
            this.goAddinfo()
            break
          case 'W04':
            this.goAddinfo()
            break
          case 'W05':
            this.goWaitCalAmount()
            break
          case 'W06':
            this.goWithdrawCash()
            break
          case 'W08':
            this.goSign()
            break
          case 'W09':
            // this.goSign()
            this.goFaceId()
            break
          case 'W10':
            break
          case 'W11':
          default:
            break
        }
      },
      /**
       * 获取用户钱包进度状态
       */
      getUserWalletStatus() {
        this.$http.post(this.$api.walletQueryNode, null, {
        }).then((res) => {
          console.log(res)
          if (+res.errorCode === 0) {
            let node = res.data.node
            switch (node) {
              case 'W01':
                this.userStatus = node
                this.enterBtnText = '完成实名认证'
                break
              case 'W02':
              case 'W03':
                this.userStatus = node
                this.enterBtnText = '完善个人资料'
                break
              case 'W04':
                this.userStatus = node
                this.enterBtnText = '去获取额度'
                break
              case 'W05':
                this.userStatus = node
                this.enterBtnText = '查看额度'
                break
              case 'W06':
                this.userStatus = node
                this.walletShowQuota()
                this.enterBtnText = '去提现'
                break
              case 'W07':
                this.$router.replace({
                  name: 'loanAssess',
                  query: {
                    status: 2
                  }
                })
                break
              case 'W08':
                this.userStatus = node
                this.walletShowQuota()
                this.getWalletLoanInfo()
                this.enterBtnText = '去签名'
                break
              case 'W09':
                this.userStatus = node
                this.walletShowQuota()
                this.getWalletLoanInfo()
                this.enterBtnText = '去人脸识别'
                break
              case 'W10':
                this.userStatus = node
                this.walletShowQuota()
                this.getWalletLoanInfo()
                this.$router.replace({
                  name: 'loanAssess',
                  query: {
                    status: 4
                  }
                })
                break
              case 'W11':
                this.userStatus = node
                let walletUserInfo = window.FJ.getStore('walletUserInfo')
                // 放款成功，重定向到还款页面
                this.$router.replace({
                  name: 'thirdRepayEnter',
                  query: {
                    token: walletUserInfo.accessToken,
                    fintechUmuserId: walletUserInfo.idFintechUmUser
                  }
                })
                break
              default:
                this.userStatus = node
                break
            }
          } else {
            this.$zzz.toast.text(res.message)
          }
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


