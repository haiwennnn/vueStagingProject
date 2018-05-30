<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>本期明细</z-header>
        <div class="zz-tab__panel white">
          <div class="panel"
            v-if="getRepayBillStatus">
            <cells noTopLine>
              <cell class="panel-cell">
                <p slot="hd">{{repayBillDetail.paymentDate}} （第{{repayBillDetail.tenor}}期）<br/>
                  <span>滞纳金</span>
                </p>
                <p slot="ft">
                  <b>¥{{repayBillDetail.repaymentList[1].amount}}</b>
                </p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">{{repayBillDetail.paymentDate}} （第{{repayBillDetail.tenor}}期）<br/>
                  <span>月服务费</span>
                </p>
                <p slot="ft">
                  <b>¥{{repayBillDetail.repaymentList[2].amount}}</b>
                </p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">{{repayBillDetail.paymentDate}} （第{{repayBillDetail.tenor}}期）<br/>
                  <span>应还本金</span>
                </p>
                <p slot="ft">
                  <b>¥{{repayBillDetail.repaymentList[3].amount}}</b>
                </p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">{{repayBillDetail.paymentDate}} （第{{repayBillDetail.tenor}}期）<br/>
                  <span>应还利息</span>
                </p>
                <p slot="ft">
                  <b>¥{{repayBillDetail.repaymentList[4].amount | toFixed2}}</b>
                </p>
              </cell>
              <!-- <cell class="panel-cell">
                <p slot="hd">{{repayBillDetail.paymentDate}} （第{{repayBillDetail.tenor}}期）<br/>
                  <span class="s1">逾期5天</span>
                </p>
                <p slot="ft">
                  <b>¥200.00</b>
                </p>
              </cell> -->
            </cells>
          </div>
          <div slot="ft"
            class="footer">
            <z-button>
              <cell>
                <p slot="hd">合计(第1期)</p>
                <p slot="ft">¥
                  <span class="amount">{{total | toFixed2}}</span>
                </p>
              </cell>
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
   */
  export default {
    data() {
      return {
        // 获取账单详情状态
        getRepayBillStatus: false,
        userRepayInfo: '',
        total: 0,
        repayBillDetail: {}
      }
    },
    methods: {
      getRepayBill() {
        let userRepayInfo = this.userRepayInfo
        this.$http.ykdGet(this.$api.getRepayBill, {
          query: {
            contractId: userRepayInfo.contractId
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            if (userRepayInfo.currentReturnMoney !== 0) {
              // 根据当前还款是否为0判断展示的还款详情是否是当期信息
              this.total = userRepayInfo.currentReturnMoney
              this.repayBillDetail = res.data.currentList[0]
            } else {
              this.total = userRepayInfo.nextPeriodsReturnMoney
              this.repayBillDetail = res.data.nextMap
            }
            this.getRepayBillStatus = true
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    },
    created() {
      this.userRepayInfo = this.$route.params.userRepayInfo
      this.getRepayBill()
    }
  }
</script>
<style lang="less" scoped>
  .white {
    background-color: #fff;
  }
  .panel {
    padding: 0 0 0 0.3rem;
    background: #fff;
    margin-top: 0.2rem;
    .panel-cell {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      padding-left: 0;

      p {
        line-height: 2em;
        font-size: 0.28rem;
        span {
          color: #999999;
          font-size: 0.28rem;
        }
        .s1 {
          color: #ec0000;
        }
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

      .amount {
        font-size: 0.5rem;
      }
    }
  }
</style>