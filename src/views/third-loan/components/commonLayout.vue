<template>
  <div class="common-layout">
    <div class="common-layout__hd">
      <div class="user-amount-panel"
        v-if="uap">
        <div class="loop-bar"></div>
        <div class="amount-detail">
          <span class="rate">日利率0.12%</span>
          <span class="amount">&yen;5000</span>
          <span class="desc">最高额度</span>
        </div>
      </div>
      <slot name="hd"></slot>
    </div>
    <div class="common-layout__bd">
      <slot name="bd"></slot>
    </div>
    <div class="common-layout__ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'common-layout',
    props: {
      uap: Boolean
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
    border-radius: 50%;
    background-color: #ccc;
  }
  .loop-bar {
  }
  .amount-detail {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.6rem;
    margin: 0 auto;
    text-align: center;
    color: #444444;
    transform: translate(-50%, -50%);
    span {
      display: block;
      line-height: 1.1;
    }
    .rate {
      font-size: 0.2rem;
    }
    .amount {
      line-height: 0.66rem;
      padding: 0 0 0.1rem 0;
      border-bottom: 1px solid #444;
      font-size: 0.56rem;
    }
    .desc {
      line-height: 0.28rem;
      margin-top: 0.08rem;
      font-size: 0.2rem;
    }
  }
</style>


