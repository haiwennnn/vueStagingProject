<template>
  <div class="bind-bankcard-panel">
    <div class="bind-bankcard-area">
      <div class="title">
        收款银行卡
      </div>
      <cells>
        <cell is-arrow
          @on-cell-item-click="chooseBindBankcard"
          style="padding-left:1rem;">
          <div slot="bd">
            <p style="color:#ccc;">请选择您的银行卡</p>
          </div>
        </cell>
      </cells>
      <p class="descript"
        style="padding-left:.6rem;">每月21日凌晨从此卡自动扣款
        <span class="show-support-bank">查看支持银行</span>
      </p>
    </div>
    <div class="next-btn">
      <z-button type="primary">下一步</z-button>
    </div>
  </div>
</template>
<script>
  /**
   * 用户提现银行卡
   */
  export default {
    data() {
      return {}
    },
    methods: {
      chooseBindBankcard() { }
    }
  }
</script>
<style lang="less" scoped>
  .bind-bankcard-panel {
    // padding-bottom: 0.6rem;
    background-color: #fff;
  }
  .bind-bankcard-area {
    padding-bottom: 0.6rem;
    .title {
      padding: 0.6rem;
      font-size: 0.28rem;
      color: #999;
    }
    .show-support-bank {
      position: absolute;
      // top: 50%;
      bottom: 0;
      right: 0.8rem;
      color: #3060b8;
      // transform: translateY(-50%);
    }
  }
  .next-btn {
    height: 1rem;
    .zz-btn {
      height: 100%;
    }
  }
</style>


