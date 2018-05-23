<template>
  <div class="common-layout">
    <div class="common-layout__hd">
      <div class="user-amount-panel"
        v-if="uap">
        <div class="loop-bar"></div>
         <z-circle
          :percent="80"
          :stroke-width="6"
          :trail-width="6"
          trail-color="rgba(0,0,0,.4)"
          stroke-color="rgba(44,44,44,1)">
          <div class="amount-detail">
            <span class="rate">{{text1}}</span>
            <span class="amount">&yen;{{text2}}</span>
            <span class="desc">{{text3}}</span>
          </div>
        </z-circle>
        <div v-if="button.length>0"><z-button class="btn">{{button}}</z-button></div>
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
import ZCircle from './circle'
export default {
  name: 'common-layout',
  props: {
    uap: Boolean,
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
  components: {
    ZCircle
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
      font-size: 0.56rem;
    }
    .desc {
      width: 1.6rem;
      line-height: 0.28rem;
      margin-top: 0.08rem;
      font-size: 0.2rem;
      padding-top: 0.1rem;
      border-top: .01rem solid #444;
    }
  }
  .btn{
    background: #444444;
    border-radius: 90px;
    color: #F9CA1A ;
    width: 1.96rem;
    height: .56rem;
    line-height: .56rem;
  }
</style>


