<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>{{currentRepayInfo.text}}</z-header>
        <div class="zz-tab__panel">
          <cells noTopLine>
            <div class="amount">
              <p>
                <span>{{currentRepayInfo.text}}</span>
              </p>
              <p>
                <i>¥</i>{{currentRepayInfo.amount| toFixed2}}</p>
            </div>
          </cells>
          <div slot="bd"
            class="panel">
            <cell class="panel-cell-t">
              <p slot="hd"><img src="../../../assets/repay/bankcard.png"
                  style="display: block;width: .4rem;"></p>
              <p slot="bd">
                <b>还款银行卡</b><br/>
                <span>每月21日凌晨自动扣款</span>
              </p>
            </cell>
            <cells noTopLine>
              <cell class="panel-cell"
                @on-cell-item-click="chooseRepayBankcard(index)"
                v-for="(item,index) in bankcardList"
                :key="index">
                <p slot="hd"><img src="../../../assets/repay/bankcard.png"
                    style="display: block;width: .4rem;"></p>
                <p slot="bd">{{item.bankName}}({{item.bankCardNo | bankcard4No}})</p>
                <p slot="ft">
                  <i v-if="index !== currentRepayBankcardIndex"
                    class="ionicons ion-ios-circle-outline"></i>
                  <i v-if="index === currentRepayBankcardIndex"
                    class="ionicons ion-ios-circle-filled"></i>
                </p>
              </cell>
              <!-- <cell class="panel-cell">
                <p slot="hd"><img src="../../../assets/repay/bankcard.png"
                    style="display: block;width: .4rem;"></p>
                <p slot="bd">招商银行(2420)</p>
                <p slot="ft">
                  <i class="ionicons ion-ios-circle-filled"></i>
                </p>
              </cell> -->
              <cell class="panel-cell"
                @on-cell-item-click="goBindBankcard">
                <p slot="hd">
                  <i class="ionicons ion-plus-circled"></i>
                </p>
                <p slot="bd">添加银行卡</p>
              </cell>
            </cells>
          </div>
          <div slot="ft"
            class="footer">
            <z-button @click="triggerRepayment">立即还款 ¥
              <span>{{currentRepayInfo.amount| toFixed2}}</span>
            </z-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 提前结清
   * 银行卡查询如果不存在
   */
  import bankcardMixins from '@/mixins/bankcard.js'
  export default {
    mixins: [bankcardMixins],
    data() {
      return {
        userRepayInfo: {},
        // 当前还款详情
        currentRepayInfo: {
          amount: 0,
          type: 'A002',
          tradeName: '当前还款',
          text: '当前应还'
        },
        bankcardList: [],
        // 当前选中还款卡索引
        currentRepayBankcardIndex: -1,
        // 获取银行卡列表状态
        getBankcardStatus: false,
        _BankcardTypeMap: null
      }
    },
    methods: {
      goBindBankcard() {
        this.$router.push({
          name: 'bindBankcard'
        })
      },
      chooseRepayBankcard(index) {
        this.currentRepayBankcardIndex = index
      },
      triggerRepayment() {
        let userRepayInfo = this.userRepayInfo
        let currentRepayInfo = this.currentRepayInfo
        let bankcard = this.bankcardList[this.currentRepayBankcardIndex]
        // 提前结清A003
        // 还当期A002
        let repaymentInfo = {
          id: bankcard.id,
          type: currentRepayInfo.type,
          bankName: bankcard.bankName,
          tradeName: currentRepayInfo.tradeName,
          amount: parseFloat(currentRepayInfo.amount).toString(),
          custBankAccountNo: bankcard.bankCardNo,
          custBindPhoneNo: '',
          custName: '',
          custBankAcctType: '1',
          custAccountCreditOrDebit: '1',
          custCardValidDate: '',
          custCardCvv2: '',
          merchantTreatyNo: userRepayInfo.src_case_id,
          custID: '',
          remark: '',
          planId: userRepayInfo.planId,
          customerId: userRepayInfo.customerId,
          contractId: userRepayInfo.contractId
        }
        console.log(repaymentInfo)
        // return
        this.$http.ykdPost(
          this.$api.triggerRepayment,
          {
            data: repaymentInfo,
            timeout: 70000
          })
          .then((res) => {
            if (+res.errorCode === 0) {
              this.$zzz.alert.show({
                content: '恭喜还款成功',
                onHide() {
                  this.$router.back()
                }
              })
            } else if (+res.errorCode === 1) {
              this.$zzz.alert.show({
                content: '还款失败,请核实后再进行还款操作'
              })
            } else if (+res.errorCode === 2) {
              this.$zzz.alert.show({
                content: '还款申请已提交成功<br>稍后在还款记录中查看进度'
              })
            } else {
              this.$zzz.alert.show({
                content: res.message
              })
            }
          })
      }
    },
    created() {

    },
    mounted() {
      this.$nextTick(() => {
        // 获取还款信息
        let userRepayInfo = window.FJ.getStore('userRepayInfo')
        this.userRepayInfo = userRepayInfo
        // 获取还款类型 还当期或还全部
        this.repayType = this.$route.query.repayType
        let currentRepayInfo = this.currentRepayInfo
        if (this.userRepayInfo) {
          // 处理当前还款详情
          // currentRepayInfo.amount = this.userRepayInfo.currentReturnMoney || this.userRepayInfo.nextPeriodsReturnMoney
          if (this.userRepayInfo.currentReturnMoney) {
            currentRepayInfo.amount = this.userRepayInfo.currentReturnMoney
          } else {
            currentRepayInfo.type = 'A005'
            currentRepayInfo.amount = this.userRepayInfo.nextPeriodsReturnMoney
          }
          if (this.repayType === 'all') {
            // 当前还款为提前结清
            currentRepayInfo.amount = userRepayInfo.earlySettlement
            currentRepayInfo.text = '提前结清'
            currentRepayInfo.tradeName = '提前结清'
            currentRepayInfo.type = 'A003'
          }
          this.currentRepayInfo = currentRepayInfo
          // 获取银行卡列表
          this.getBankcardList({
            loanId: this.userRepayInfo.src_case_id
          }).then((res) => {
            if (+res.errorCode === 0) {
              this.bankcardList = this.filterBankcard(res.data, 1)
              this.bankcardList.forEach((item, index) => {
                if (item.bankCardNo === userRepayInfo.repay_acct) {
                  this.currentRepayBankcardIndex = index
                }
              })
              console.log(this.bankcardList)
            } else {
              this.$zzz.toast.text(res.message)
            }
          })
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .amount {
    text-align: center;
    color: #222;
    font-size: 0.8rem;
    line-height: 1em;
    padding: 0.3rem 0 0.5rem;
    font-family: "SFUDinMitAlt";

    span {
      font-size: 0.26rem;
      color: #888;
      line-height: 1.7em;
    }
    i {
      font-size: 0.3rem;
      font-style: normal;
    }
  }
  .panel {
    padding: 0 0.3rem;
    padding-bottom: 1.2rem;
    background: #fff;
    margin-top: 0.2rem;

    .panel-cell-t {
      padding-left: 0;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;

      p {
        line-height: 1em;
        span {
          color: #999999;
          font-size: 0.2rem;
        }
      }
    }
    .panel-cell {
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;

      p {
        line-height: 1em;
        span {
          color: #999999;
          font-size: 0.2rem;
        }
      }

      i.ion-ios-circle-filled {
        font-size: 0.48rem;
        color: #ff7734;
      }
      i.ion-ios-circle-outline {
        font-size: 0.48rem;
        color: #ccc;
      }
      i.ion-plus-circled {
        font-size: 0.4rem;
        color: #3f5c99;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;

    button {
      color: rgba(0, 0, 0, 0.8);
      height: 1.1rem;
      background-color: #f9ca1a;
      font-family: "SFUDinMitAlt";

      & > span {
        font-size: 0.4rem;
      }
      &:after {
        border: 0;
      }
    }
  }
</style>