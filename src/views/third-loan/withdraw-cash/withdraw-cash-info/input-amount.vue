<template>
  <div class="input-amount-panel">
    <div class="input-amount-area">
      <div class="title">
        借款金额
      </div>
      <div class="input-amount">
        <label for="inputAmount">
          <span>&yen;</span>
          <input id="inputAmount"
            type="text">
        </label>
      </div>
      <p class="descript"
        style="color:#ccc;">*按日计息，日利率0.1%</p>
    </div>
    <div class="select-loan-periods-area">
      <cells>
        <cell is-arrow
          @on-cell-item-click="chooseLoanPeriods"
          style="padding-left:.6rem;">
          <p slot="hd">借款期数</p>
          <div slot="bd">
            <p style="text-align:center;">10个月</p>
          </div>
        </cell>
      </cells>
    </div>
    <div class="repay-info-area">
      <div class="repay-info-item">
        <span class="title">首次还款</span>
        <span class="content">¥107.60(4月21日)</span>
      </div>
      <div class="repay-info-item">
        <span class="title">还款日</span>
        <span class="content">每月21日</span>
      </div>
      <div class="repay-info-item">
        <span class="title">还款详情</span>
        <span class="content"
          style="color:#3060B8;">查看</span>
      </div>
    </div>
    <div class="next-btn">
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
  export default {
    data() {
      return {}
    },
    methods: {
      chooseLoanPeriods() {
        console.log(11)
      },
      nextBtnClick() {
        this.$emit('on-withdraw-cash-event', {
          type: 'inputAmount',
          data: {}
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .input-amount-area {
    height: 4.8rem;
    padding: 0 0.6rem;
    background-color: #fff;
    overflow: hidden;
    .title {
      padding-top: 0.8rem;
      font-size: 0.28rem;
      color: #999;
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
      input {
        height: 1.6rem;
        width: 100%;
        margin-left: -0.5rem;
        border: 0;
        outline: 0;
        font-size: 1rem;
        text-indent: 0.6rem;
        background-color: transparent;
      }
    }
  }
  .repay-info-area {
    padding: 0.6rem;
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


