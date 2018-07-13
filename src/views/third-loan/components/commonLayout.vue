<template>
  <div class="common-layout">
    <div class="common-layout__hd">
      <div class="user-amount-panel"
        @click="onUserAmountPanelEvent"
        v-if="uap">
        <div class="loop-bar"></div>
        <z-circle :percent="percent"
          :stroke-width="6"
          :trail-width="6"
          trail-color="rgba(0,0,0,.4)"
          stroke-color="rgba(44,44,44,1)">
          <div class="amount-detail">
            <span class="rate">{{loanInfo.repayDateStr}}</span>
            <span class="amount">&yen;{{showAmount | toFixed2}}</span>
            <span class="desc">{{loanInfo.desStr}}</span>
          </div>
        </z-circle>
        <div v-if="button.length>0">
          <z-button class="btn">{{button}}</z-button>
        </div>
        <!-- <slot name="hd__btn"></slot> -->
      </div>
      <slot name="hd"></slot>
    </div>
    <z-wave></z-wave>
    <div class="common-layout__bd">
      <slot name="bd"></slot>
    </div>
    <div class="common-layout__ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>
<script>
  import ZCircle from './circle'
  import ZWave from './wave'
  import Reg from '@/lib/reg.js'
  export default {
    name: 'common-layout',
    components: {
      ZCircle,
      ZWave
    },
    props: {
      uap: Boolean,
      totalAmount: {
        type: [String, Number],
        default: 5000
      },
      productInfo: {
        type: Object,
        default: function () {
          return {
            amount: 5000
          }
        }
      },
      /**
       * 面板展示信息
       * maxAmount 最大额度
       * amount 提现额度
       * repayAmount 还款额度
       * desStr: 描述
       * repayDateStr: 还款日期描述
       */
      loanInfo: {
        type: Object,
        default: function () {
          return {
            amount: 0,
            maxAmount: 0,
            repayAmount: 0,
            desStr: '',
            repayDateStr: ''
          }
        }
      },
      text1: {
        type: String,
        default: ''
      },
      text2: {
        type: String,
        default: ''
      },
      text3: {
        type: String,
        default: ''
      },
      button: {
        type: String,
        default: ''
      }
    },
    computed: {
      showAmount() {
        if (Reg.numberReg.test(this.loanInfo.amount) && +this.loanInfo.amount > 0) {
          return this.loanInfo.amount
        } else if (+this.loanInfo.repayAmount > 0) {
          return this.loanInfo.repayAmount
        } else {
          return this.loanInfo.maxAmount
        }
      },
      percent() {
        if (!Reg.numberReg.test(this.loanInfo.amount)) {
          // 不存在提现额度
          return 100
        } else if (this.loanInfo.amount > 0) {
          // 存在提现额度，提现额度不为0
          return (+this.loanInfo.amount / this.loanInfo.maxAmount) * 100
        } else {
          return 100
        }
      }
    },
    methods: {
      onUserAmountPanelEvent() {
        this.$emit('on-user-amount-panel-click')
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .common-layout {
    height: 100%;
    background-color: #fff;
  }
  .common-layout__hd {
    height: 5rem;
    background-color: #f9ca1a;
    overflow: hidden;
  }
  .common-layout__bd {
    overflow: hidden;
  }
  .common-layout__ft {
  }

  .user-amount-panel {
    position: relative;
    width: 3rem;
    height: 3rem;
    margin: 0.6rem auto 0;
  }
  .loop-bar {
  }
  .amount-detail {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    text-align: center;
    color: #444444;
    transform: translate(-50%, -50%);
    span {
      display: inline-block;
      line-height: 1.1;
    }
    .rate {
      font-size: 0.2rem;
    }
    .amount {
      line-height: 0.66rem;
      padding: 0 0 0 0;
      font-size: 0.46rem;
    }
    .desc {
      width: 1.6rem;
      line-height: 0.28rem;
      margin-top: 0.08rem;
      font-size: 0.2rem;
      padding-top: 0.1rem;
      border-top: 0.01rem solid #444;
    }
  }
  .btn {
    background: #444444;
    border-radius: 90px;
    color: #f9ca1a;
    width: 1.96rem;
    height: 0.56rem;
    line-height: 0.56rem;
  }
</style>


