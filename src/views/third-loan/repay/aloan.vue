<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>本期明细</z-header>
        <div class="zz-tab__panel white">
          <div class="panel">
            <ul>
              <li>
                <b>产品名称</b>
                <span>{{ iouDetail.description }}</span>
              </li>
              <li>
                <b>合同金额</b>
                <span>￥{{ iouDetail.amount | toFixed2 }}</span>
              </li>
              <li>
                <b>到手金额</b>
                <span>￥{{ iouDetail.actual_money | toFixed2 }}</span>
              </li>
              <li>
                <b>月利率</b>
                <span>{{ getMonthRate(iouDetail.month_rate) }}</span>
              </li>
              <li>
                <b>每月还款金额</b>
                <span>￥{{ iouDetail.month_money }}</span>
              </li>
              <li>
                <b>起止时间</b>
                <span>{{ iouDetail.start_date +'至'+ iouDetail.end_date }}</span>
              </li>
              <li>
                <b>首次还款时间</b>
                <span>{{ iouDetail.first_payment_date }}</span>
              </li>
              <li>
                <b>借款人姓名</b>
                <span>{{ iouDetail.applicant_name | hideFullName }}</span>
              </li>
              <li>
                <b>借款人身份证</b>
                <span>{{ hideFullNumber(iouDetail.applicant_id_nbr) }}</span>
              </li>
              <li>
                <b>还款日</b>
                <span>每月{{ getRepayDay() }}日</span>
              </li>
              <li>
                <b>还款计划</b>
                <span class="click"
                  @click="showRepayPlan">查看</span>
              </li>
              <li>
                <b>借款期限</b>
                <span>{{ iouDetail.terms }}</span>
              </li>
              <li>
                <b>收款账户</b>
                <span>{{ hideFullNumber(iouDetail.receive_act_number) }}</span>
              </li>
              <li>
                <b>还款账户</b>
                <span>{{ hideFullNumber(iouDetail.payment_act_number) }}</span>
              </li>
              <li>
                <b>借款合同</b>
                <span class="click"
                  @click="popup=true">查看</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 还款计划pop -->
    <div class="popup"
      v-if="popup">
      <transition name="fj-mask">
        <div class="popup-mask"></div>
      </transition>
      <transition name="fj-dialog">
        <div class="popup-content">
          <dl class="popup-con">
            <dt>还款计划</dt>
            <dd>
              <p v-for="(item,index) in repayPlan"
                :key="index">
                <em :class="{'s':!planInlineStatus(item)}">{{item.paymentDate | formatTime('yyyy-MM-dd')}}</em>
                <em :class="{'s':!planInlineStatus(item)}">¥{{item.amount}}</em>
                <span class="pay-text"
                  v-if="item.status === 'A2' || item.status === 'A3'">已还清</span>
                <span class="pay-text"
                  :class="{'overdue':item.status === 'A1'}"
                  v-if="item.status === 'A1'">已逾期</span>
                <span class="pay-text"
                  :class="{'overdue':item.status === 'A-1'}"
                  v-if="item.status === 'A-1'">未还清</span>
              </p>
            </dd>
          </dl>
          <div class="popup-close">
            <i class="ionicons ion-ios-close-outline"
              @click="popup=false"></i>
          </div>
        </div>
      </transition>
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
        popup: false,
        iouDetail: {},
        repayPlan: []
      }
    },
    methods: {
      planInlineStatus(item) {
        return item.status === 'A1' || item.status === 'A2' || item.status === 'A3' || item.status === 'A-1'
      },
      // 展示还款计划
      showRepayPlan() {
        this.getRepayPlan()
      },
      /**
       * 获取合同信息
       */
      getIou() {
        let userRepayInfo = window.FJ.getStore('userRepayInfo')[0]
        this.$http.ykdGet(this.$api.getIou + userRepayInfo.src_case_id).then((res) => {
          this.iouDetail = res.data || {}
        })
      },
      /**
       * 获取还款计划
       */
      getRepayPlan() {
        let userRepayInfo = window.FJ.getStore('userRepayInfo')[0]
        this.$http.ykdGet(this.$api.getRepayPlan + userRepayInfo.src_case_id).then((res) => {
          if (+res.errorCode === 0) {
            this.repayPlan = res.data || {}
            this.popup = true
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      getMonthRate: function (mr) {
        if (!mr) {
          return ''
        }
        let str = (mr * 100).toString().substring(0, 5)
        return str + '%'
      },
      hideFullNumber: function (num) {
        if (!num) {
          return ''
        }
        let str = num.toString()
        let len = str.length
        return str.substring(0, 3) + new Array(len - 6).join('*') + str.substring(len - 4, len)
      },
      hideFullName: function (n) {
        if (!n) return ''
        if (n.length === 2) {
          return n.substring(0, 1) + '*'
        }
        if (n.length === 3) {
          return n.substring(0, 1) + '*' + n.substring(2, 3)
        }
      },
      getRepayDay: function () {
        if (!this.iouDetail.first_payment_date) {
          return ''
        }
        return this.iouDetail.first_payment_date.split('-')[2]
      }
    },
    created() {
      this.getIou()
    }
  }
</script>
<style lang="less" scoped>
  .panel {
    padding: 0.3rem;
    background: #fff;
    margin: 0.3rem;
    border-radius: 0.08rem;

    ul {
      list-style: none;
      li {
        list-style: none;
        margin-bottom: 0.2rem;
        color: #999;
        b {
          display: inline-block;
          width: 40%;
          font-weight: 100;
          color: #000;
        }
        .click {
          color: #e06b57;
          &:active {
            opacity: 0.5;
          }
        }
      }
    }
  }
  .popup {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;

    .popup-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .popup-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .popup-con {
      background: #ffffff;
      border-radius: 0.16rem;
      width: 6rem;
      dt {
        font-size: 0.32rem;
        padding: 0.4rem 0;
        text-align: center;
        font-weight: 200;
        box-shadow: inset 0 -0.01rem 0 0 #cccccc;
      }
      dd {
        height: 7rem;
        overflow: auto;

        p {
          padding: 0.2rem 0.3rem;
          font-size: 0.24rem;
          color: #ccc;
          em {
            font-style: normal;
            display: inline-block;
            width: 1.8rem;
            padding-left: 0.3rem;
          }
          em.s {
            color: #222;
          }
          span.pay-text {
            color: #00ba8d;
          }
          span.overdue {
            color: #c41e1f;
          }
        }
      }
    }
    .popup-close {
      font-size: 0.8rem;
      color: #fff;
      text-align: center;
    }

    .fj-dialog-enter-active,
    .fj-dialog-leave-active {
      opacity: 1;
      transition-duration: 400ms;
      transform: translate(-50%, -50%) scale(1) !important;
      transition-property: transform, opacity !important;
    }
    .fj-dialog-leave-active {
      transition-duration: 300ms;
    }
    .fj-dialog-enter {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.185) !important;
    }
    .fj-dialog-leave-active {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.85) !important;
    }

    .fj-mask-enter,
    .fj-mask-leave-active {
      opacity: 0;
    }
    .fj-mask-leave-active,
    .fj-mask-enter-active {
      transition: opacity 300ms;
    }
  }
</style>