<template>
  <div class="input-amount-panel"
    :class="{'cover':+status !== 1}">
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
      <!-- <cells>
        <cell is-arrow
          @on-cell-item-click="chooseLoanPeriods"
          style="padding-left:.6rem;">
          <p slot="hd">借款期数</p>
          <div slot="bd">
            <p style="text-align:center;">{{tenorText}}</p>
          </div>
        </cell>
      </cells> -->
      <z-form>
        <popup-picker v-model="userSelectedTenorIndex"
          label="贷款期数"
          valueTextAlign="center"
          :data="tenorListData"></popup-picker>
      </z-form>
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
        walletUserInfo: null,
        // 用户输入额度
        amount: '',
        minAmount: 1000,
        placeholder: '',
        // 期数picker数据源
        tenorListData: [],
        // 用户已选期限 默认第一期？还是默认不选需要用户选择？
        userSelectedTenorIndexArr: [],
        // 用户已选期限 默认第一期？还是默认不选需要用户选择？
        userSelectedTenorIndex: [],
        walletTrialSt: null,
        isInputAmountStatus: false,
        isWalletTrialStatus: false,
        // 试算详情
        walletTrialInfo: {}
      }
    },
    computed: {
      // tenorText() {
      //   if (!this.tenorList || this.tenorList.length === 0) {
      //     return '请选择期数'
      //   }
      //   return `${this.tenorList[this.userSelectedTenorIndex].tenor}个月`
      // },
      /**
       * 判断是否输入了额度
       */
      isInputAmount() {
        if (Reg.numberReg.test(this.amount) && this.amount !== '') {
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
        this.check()
      },
      userSelectedTenorIndex(newVal) {
        this.check()
      },
      tenorList(newVal) {
        this.setTenorList(newVal)
      }
    },
    methods: {
      check() {
        let status = this.checkAmount()
        if (status !== 0) {
          this.isWalletTrialStatus = false
          if (this.walletTrialSt) {
            clearTimeout(this.walletTrialSt)
          }
          if (status === -2) {
            this.$zzz.toast.text(`最高输入${this.walletUserInfo.loanLimit}元`)
          }
          if (status === -3) {
            this.$zzz.toast.text(`最低输入${this.minAmount}元`)
          }
          return
        }
        let tenorStatus = this.checkTenor()
        if (tenorStatus !== 0) {
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
      // 校验金额
      checkAmount() {
        if (!this.amount || !Reg.numberReg.test(this.amount)) {
          // 金额错误
          return -1
        }
        if (+this.amount < +this.minAmount) {
          // 金额小于下限
          return -3
        }
        if (+this.amount > +this.walletUserInfo.loanLimit) {
          // 金额超过上限
          return -2
        }
        return 0
      },
      // 校验期数
      checkTenor() {
        if (!this.tenorList || this.tenorList.length === 0 || !this.userSelectedTenorIndex) {
          return -1
        }
        return 0
      },
      // 还款试算
      walletTrial() {
        this.$http.post(this.$api.walletTrial, {
          data: {
            term: this.userSelectedTenorIndex[0],
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
      },
      nextBtnClick() {
        if (!this.isWalletTrialStatus) {
          return
        }
        this.$emit('on-withdraw-cash-event', {
          type: 'inputAmount',
          data: {
            walletTrialInfo: this.walletTrialInfo,
            userSelectedTenorIndex: this.userSelectedTenorIndex,
            tenor: this.tenorList[this.userSelectedTenorIndex]
          }
        })
      },
      setTenorList(tenorList) {
        tenorList = tenorList || []
        let tenorListData = []
        tenorListData = tenorList.map((item, index) => {
          return {
            name: `${item.tenor}个月`,
            value: item.tenor
          }
        })
        if (tenorListData.length > 0) {
          this.userSelectedTenorIndex = [tenorListData[0].value]
        }
        this.tenorListData = tenorListData
      }
    },
    created() {
      this.walletUserInfo = window.FJ.getStore('walletUserInfo')
      if (this.walletUserInfo.loanLimit) {
        this.placeholder = `最高输入${this.walletUserInfo.loanLimit}元`
      }
      this.setTenorList(this.tenorList)
    }
  }
</script>
<style lang="less" scoped>
  .input-amount-panel {
    position: relative;
    background-color: #fff;
  }
  .input-amount-panel.cover {
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 5;
    }
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
    .zz-cell {
      padding-left: 0.6rem;
    }
  }
</style>



