<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>信用钱包
          <!-- <span slot="right">银行卡</span> -->
        </z-header>
        <div class="zz-tab__panel">
          <common-layout :uap="true"
            @on-user-amount-panel-click="goCurrentRepayBill"
            :loan-info="loanInfo">
            <div class="hd-btn-list"
              slot="hd">
              <button-group v-if="getRepayInfoStatus">
                <z-button mini
                  style="margin-right:0;"
                  @click="goRepayment">还款记录</z-button>
              </button-group>
            </div>
            <div v-if="!getRepayInfoStatus"
              slot="bd">
              <p class="no-repay-info">未查询到还款信息</p>
            </div>
            <div v-if="getRepayInfoStatus"
              slot="bd"
              class="panel">
              <cell class="panel-cell-t">
                <p slot="hd"><img src="../../../assets/repay/bankcard.png"
                    style="display: block;width: .4rem;"></p>
                <b slot="bd">还款银行卡</b>
              </cell>
              <cells noTopLine>
                <cell @on-cell-item-click="repayCurrent"
                  class="zz-cell_access panel-cell">
                  <p slot="hd"><img src="../../../assets/repay/bankcard.png"
                      style="display: block;width: .4rem;"></p>
                  <p slot="bd">{{repayMethodStr(userRepayInfo)}}</p>
                </cell>
                <cell class="panel-info">
                  <!-- <span slot="bd"
                    class="repaly-date">每月21日凌晨自动扣款</span> -->
                  <span slot="ft"
                    @click="repayCurrent"
                    class="repaly-txt">如何提前手动还款？</span>
                </cell>
              </cells>
            </div>
            <div v-if="getRepayInfoStatus"
              slot="ft"
              class="footer">
              <flexbox>
                <flexbox-item :flex="'1'"></flexbox-item>
                <flexbox-item :flex="'1'">
                  <z-button @click="repayAll">提前结清</z-button>
                </flexbox-item>
                <flexbox-item :flex="'1'">
                  <z-button @click="goLoan">借款记录</z-button>
                </flexbox-item>
                <flexbox-item :flex="'1'"></flexbox-item>
              </flexbox>
            </div>
          </common-layout>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 用户还款页面入口
   */
  import commonLayout from '../components/commonLayout'
  export default {
    data() {
      return {
        // 用户还款信息
        userRepayInfo: {},
        // 贷款信息
        loanInfo: {},
        // 获取还款信息状态
        getRepayInfoStatus: false
      }
    },
    components: {
      commonLayout
    },
    methods: {
      test() {
        console.log('test')
      },
      /**
       * 去当期还款明细页面
       */
      goCurrentRepayBill() {
        if (!this.getRepayInfoStatus) {
          return
        }
        this.$router.push({
          name: 'thirdRepayBill',
          params: {
            userRepayInfo: this.userRepayInfo
          }
        })
      },
      /**
       * 去还款记录页面
       */
      goRepayment() {
        this.$router.push({
          name: 'thirdRepayRepayment'
        })
      },
      /**
       * 还款方式字符串
       * 首先根据loanId查询repayMethodDataCache是否存在记录
       * 不存在默认使用还款信息中 ‘银行名称’ + ‘卡号后4位’
       */
      repayMethodStr(repayDataItem) {
        // 读取银行卡信息
        let repayAcct = repayDataItem.repay_acct
        let bankcardNo = repayAcct ? '(' + repayAcct.substring(repayAcct.length - 4, repayAcct.length) + ')' : ''
        let bankName = repayDataItem.repay_bank_name
        return bankName + bankcardNo
      },
      // 返回还款日期字符串
      getRepayDateStr(repayDataItem) {
        if (!repayDataItem || repayDataItem === null) {
          return '&nbsp; '
        } else {
          if (repayDataItem.currentReturnMoney === 0) {
            return window.FJ.formatDate(repayDataItem.nextPeriodsDate.replace(/-/g, '') + '000000', 'MM月dd日')
          } else {
            return window.FJ.formatDate(repayDataItem.paymentDate.replace(/-/g, '') + '000000', 'MM月dd日')
          }
        }
      },
      /**
       * 还当期
       */
      repayCurrent() {
        if (!this.checkIsRepay()) {
          return
        }
        this.$router.push({
          name: 'thirdRepayAdvance',
          params: {
            userRepayInfo: this.userRepayInfo,
            repayType: 'current'
          }
        })
      },
      /**
       * 提前结清
       */
      repayAll() {
        if (!this.checkIsRepay()) {
          return
        }
        this.$router.push({
          name: 'thirdRepayAdvance',
          query: {
            repayType: 'all'
          }
        })
      },
      /**
       * 去借款记录
       */
      goLoan() {
        this.$router.push({
          name: 'thirdRepayLoan'
        })
      },
      /**
       * 查询还款信息
       */
      getRepayInfo() {
        this.$http.ykdGet(this.$api.getRepaymentInfoNew).then((res) => {
          // console.log(res)
          if (+res.errorCode === 0) {
            // TODO:多笔还款的处理
            let userRepayInfo = res.data[0]
            let tenor = userRepayInfo.tenor ? userRepayInfo.tenor : userRepayInfo.nextTenor
            let loanInfo = {
              amount: userRepayInfo.applyMoney,
              currentRepayAmount: 0,
              repayDateStr: this.getRepayDateStr(userRepayInfo) + '应还',
              tenorStr: `当前第${tenor}期`
            }
            if (userRepayInfo.currentReturnMoney !== 0) {
              // 根据当前还款是否为0判断展示的还款详情是否是当期信息
              loanInfo.currentRepayAmount = userRepayInfo.currentReturnMoney
            } else {
              loanInfo.currentRepayAmount = userRepayInfo.nextPeriodsReturnMoney
            }
            this.loanInfo = loanInfo
            this.userRepayInfo = userRepayInfo
            window.FJ.setStore('userRepayInfo', userRepayInfo)
            this.getRepayInfoStatus = true
            // 查到还款信息后获取用户基本信息
            this.getUserInfo()
          } else {
            this.loanInfo = {
              amount: '0',
              currentRepayAmount: '0',
              repayDateStr: '',
              tenorStr: ''
            }
          }
        })
      },
      /**
       * 判断是否允许进行主动还款
       */
      checkIsRepay() {
        let status = true
        if (!this.userRepayInfo) {
          status = false
        } else {
          status = this.userRepayInfo.isSubmit
        }
        if (!status) {
          this.$zzz.toast.text('当前订单有笔还款正在处理中,请稍后重试')
        }
        return status
      },
      /**
       * 获取用户基本信息
       */
      getUserInfo() {
        this.$http.ykdPost(this.$api.getUserInfo).then((res) => {
          console.log(res)
          // TODO:处理用户信息
          if (+res.errorCode === 0) {
            let userInfo = window.FJ.getStore('walletUserInfo')
            let user = res.data.user
            userInfo = {
              accessToken: userInfo.accessToken,
              idFintechUmUser: userInfo.idFintechUmUser,
              phone: user.mobileNo,
              token: '',
              username: user.realName
            }
            window.FJ.setStore('walletUserInfo', userInfo)
          } else {
            this.$zzz.toast.text('读取用户基本信息失败')
          }
        }, (e) => {
          this.$zzz.toast.text('读取用户基本信息失败')
        })
      }
    },
    created() {
      this.getRepayInfo()
    }
  }
</script>
<style lang="less" scoped>
  .hd-btn-list {
    .zz-btn-group {
      text-align: center;
      .zz-btn {
        width: 1.96rem;
        height: 0.55rem;
        line-height: 0.55rem;
        border-radius: 30px;
        background-color: #444;
        color: #f9ca1a;
        font-size: 0.24rem;
      }
    }
  }
  .no-repay-info {
    padding: 0.4rem 0;
    color: #999;
    text-align: center;
  }
  .panel {
    padding: 0.3rem;

    .panel-cell-t {
      padding-left: 0;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
    }
    .panel-cell {
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      &:after {
        left: 0.9rem;
      }
    }
    .panel-info {
      padding-top: 0.1rem;
      padding-bottom: 0.4rem;
      padding-left: 0.9rem;
      font-size: 0.2rem;

      .repaly-date {
        color: #999999;
        margin-left: -0.2rem;
      }
      .repaly-txt {
        color: #376ce9;
        margin-right: -0.2rem;
        // background: url('../../../assets/sign/sign-bg.png')
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0.2rem;
    width: 100%;
    text-align: center;

    button {
      color: rgba(0, 0, 0, 0.5);

      &:after {
        border: 0;
      }
    }
  }
</style>


