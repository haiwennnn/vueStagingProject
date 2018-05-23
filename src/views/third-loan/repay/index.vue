<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>信用钱包
          <span slot="right">银行卡</span>
        </z-header>
        <div class="zz-tab__panel">
          <common-layout :uap="true">
            <div slot="bd" class="panel">
              <cell class="panel-cell-t">
                <p slot="hd"><img src="../../../assets/repay/bankcard.png" style="display: block;width: .4rem;"></p>
                <b slot="bd">还款银行卡</b>
              </cell>
              <cells noTopLine>
                <cell class="zz-cell_access panel-cell">
                  <p slot="hd"><img src="../../../assets/repay/bankcard.png" style="display: block;width: .4rem;"></p>
                  <p slot="bd">招商银行(2420)</p>
                </cell>
                <cell class="panel-info">
                  <span slot="bd" class="repaly-date">每月21日凌晨自动扣款</span>
                  <span slot="ft" class="repaly-txt">如何提前手动还款？</span>
                </cell>
              </cells>
            </div>
            <div slot="ft" class="footer">
              <flexbox>
                <flexbox-item :flex="'1'"></flexbox-item>
                <flexbox-item :flex="'1'">
                  <z-button @click="goAdvance">提前结清</z-button>
                </flexbox-item>
                <flexbox-item :flex="'1'">
                  <z-button @click="goLoan">借款记录</z-button>
                </flexbox-item>
                <flexbox-item :flex="'1'"></flexbox-item>
              </flexbox>
            </div>
          </common-layout>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 用户还款页面入口
   */
  import commonLayout from '../components/commonLayout'
  export default {
    data() {
      return {}
    },
    components: {
      commonLayout
    },
    methods: {
      goAdvance() {
        this.$router.push('/third-loan/advance')
      },
      goLoan() {
        this.$router.push('/third-loan/loan')
      }
    }
  }
</script>
<style lang="less" scoped>
.panel{
  padding: 0.30rem;

  .panel-cell-t{
    padding-left: 0;
    padding-top:.40rem;
    padding-bottom:.40rem;
  }
  .panel-cell{
    padding-top:.40rem;
    padding-bottom:.40rem;
    &:after{
      left:.90rem;
    }
  }
  .panel-info{
    padding-top:.10rem;
    padding-bottom:.40rem;
    padding-left: .90rem;
    font-size:.20rem;

    .repaly-date{
      color: #999999;
      margin-left: -.2rem
    }
    .repaly-txt{
      color: #376CE9;
      margin-right: -.2rem
    }
  }
}
.footer{
  position: fixed;
  bottom:.20rem;
  width: 100%;
  text-align: center;

  button{
    color:rgba(0,0,0,.5);

    &:after{
      border: 0;
    }
  }

}
</style>


