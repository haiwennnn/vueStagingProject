<template>
  <div class="confirm-detail-panel">
    <div class="confirm-detail-area">
      <div class="title">
        信息确认
      </div>
      <div class="confirm-detail-item">
        <span class="title">借款金额</span>
        <span class="content">&yen;5000</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">还款期数</span>
        <span class="content">12</span>
      </div>
      <div class="confirm-detail-item">
        <span class="title">收款账户</span>
        <span class="content">招商银行(2341)</span>
      </div>
    </div>
    <div class="next-btn">
      <z-button type="primary">下一步</z-button>
    </div>
  </div>
</template>
<script>
  /**
   * 提现详情
   */
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .confirm-detail-area {
    background-color: #fff;
    padding: 0.6rem;
    .title {
      padding-bottom: 0.6rem;
      font-size: 0.28rem;
      color: #999;
    }
  }
  .confirm-detail-item {
    line-height: 0.7rem;
    font-size: 0.28rem;
    color: #444;
    .title {
      display: inline-block;
      padding-bottom: 0;
      // padding-left: .6rem;
      width: 2.5rem;
      color: #666;
    }
  }
  .next-btn {
    height: 1rem;
    .zz-btn {
      height: 100%;
    }
  }
</style>


