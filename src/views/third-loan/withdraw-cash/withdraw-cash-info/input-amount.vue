<template>
  <div class="input-amount-panel">
    <div class="input-amount-area">
      <div class="title">
        借款金额
      </div>
      <div class="input-amount">
        <label for="inputAmount"
          v-if="+status === 1">
          <span>&yen;</span>
          <input id="inputAmount"
            v-model.number="amount"
            type="text">
        </label>
        <label for="inputAmount"
          v-if="+status !== 1">
          <span>&yen;</span>
          <p>{{amount}}</p>
        </label>
      </div>
      <!-- <p class="descript"
        style="color:#ccc;">*按日计息，日利率0.1%</p> -->
    </div>
    <div class="select-loan-periods-area"
      v-if="isInputAmount">
      <cells>
        <cell is-arrow
          @on-cell-item-click="chooseLoanPeriods"
          style="padding-left:.6rem;">
          <p slot="hd">借款期数</p>
          <div slot="bd">
            <p style="text-align:center;">{{tenorText}}</p>
          </div>
        </cell>
      </cells>
    </div>
    <div class="repay-info-area"
      v-if="isInputAmount && isWalletTrial">
      <div class="repay-info-item">
        <span class="title">每月还款</span>
        <span class="content">¥{{walletTrialInfo.monthlyAmount}}</span>
      </div>
      <!-- <div class="repay-info-item">
        <span class="title">还款日</span>
        <span class="content">每月21日</span>
      </div> -->
      <!-- <div class="repay-info-item">
        <span class="title">还款详情</span>
        <span class="content"
          style="color:#3060B8;">查看</span>
      </div> -->
    </div>
    <div class="next-btn"
      v-if="+status === 1">
      <z-button type="primary"
        @click.native="nextBtnClick">下一步</z-button>
    </div>
  </div>
</template>
<script>
  /**
   * 填写用户提现金额
   * 默认只展示金额输入框
   * 输入金额后延迟500毫秒进行试算接口调用
   * 出现试算结果和下一步按钮
   * 点击下一步按钮完成金额选择进入银行卡选择
   */
  import Reg from '@/lib/reg'
  export default {
    props: {
      /**
       * 提现信息完成状态
       * 不等于1次组件不可编辑
       */
      status: [String, Number],
      tenorList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        // 用户输入额度
        amount: '',
        // 用户已选期限 默认第一期？还是默认不选需要用户选择？
        userSelectedTenorIndex: 0,
        walletTrialSt: null,
        isInputAmountStatus: false,
        isWalletTrialStatus: false,
        // 试算详情
        walletTrialInfo: {}
      }
    },
    computed: {
      tenorText() {
        if (!this.tenorList || this.tenorList.length === 0) {
          return '请选择期数'
        }
        return `${this.tenorList[this.userSelectedTenorIndex].tenor}个月`
      },
      /**
       * 判断是否输入了额度
       */
      isInputAmount() {
        // if(this.amount && )
        if (Reg.numberReg.test(this.amount)) {
          return true
        }
        return false
      },
      /**
       * 是否完成了试算
       */
      isWalletTrial() {
        return this.isInputAmount && this.isWalletTrialStatus
      }
    },
    watch: {
      amount(newVal) {
        if (!Reg.numberReg.test(this.amount)) {
          this.isWalletTrialStatus = false
          if (this.walletTrialSt) {
            clearTimeout(this.walletTrialSt)
          }
          return
        }
        if (!this.tenorList || this.tenorList.length === 0) {
          if (this.walletTrialSt) {
            clearTimeout(this.walletTrialSt)
          }
          return
        }
        if (this.walletTrialSt) {
          clearTimeout(this.walletTrialSt)
        }
        this.walletTrialSt = setTimeout(() => {
          this.isInputAmountStatus = true
          this.walletTrial()
        }, 500)
      },
      userSelectedTenorIndex(newVal) {
        if (!this.tenorList || this.tenorList.length === 0) {
          return
        }
        if (this.amount) {
          this.walletTrial()
        }
      }
    },
    methods: {
      // 还款试算
      walletTrial() {
        this.$http.post(this.$api.walletTrial, {
          data: {
            term: this.tenorList[this.userSelectedTenorIndex].tenor,
            loanMoney: this.amount
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            this.isWalletTrialStatus = true
            this.walletTrialInfo = res.data
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      chooseLoanPeriods() {
        if (+this.status !== 1) {
          // return
        }
        // TODO:触发选择银行卡
      },
      nextBtnClick() {
        this.$emit('on-withdraw-cash-event', {
          type: 'inputAmount',
          data: {
            walletTrialInfo: this.walletTrialInfo,
            userSelectedTenorIndex: this.userSelectedTenorIndex,
            tenor: this.tenorList[this.userSelectedTenorIndex]
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .input-amount-panel {
    background-color: #fff;
  }
  .input-amount-area {
    height: 4.5rem;
    padding: 0 0.6rem;

    overflow: hidden;
    .title {
      padding-top: 0.8rem;
      font-size: 0.28rem;
      color: #666;
    }
    .input-amount {
      margin-top: 0.6rem;
      border-bottom: 1px solid #ccc;
      font-size: 0;
      color: #444;
      span {
        display: inline-block;
        width: 0.5rem;
        padding-top: 0.15rem;
        font-size: 0.8rem;
        vertical-align: top;
      }
      input,
      p {
        display: inline-block;
        height: 1.6rem;
        width: 100%;
        margin-left: -0.5rem;
        border: 0;
        outline: 0;
        font-size: 1rem;
        color: #444;
        text-indent: 0.6rem;
        background-color: transparent;
      }
    }
  }
  .select-loan-periods-area {
    padding-bottom: 0.6rem;
  }
  .repay-info-area {
    padding: 0 0.6rem 0.6rem;
    background-color: #fff;
    .repay-info-item {
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #444;
      .title {
        display: inline-block;
        width: 2.5rem;
        color: #999;
      }
    }
  }
  .next-btn {
    height: 1rem;
    .zz-btn {
      height: 100%;
    }
  }
</style>
<style lang="less">
  .select-loan-periods-area {
  }
</style>



