<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>本期明细</z-header>
        <div class="zz-tab__panel white">
          <div class="panel">
            <cells noTopLine>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第1期）<br/><span>滞纳金</span></p>
                <p slot="ft"><b>¥200.00</b></p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第1期）<br/><span>月服务费</span></p>
                <p slot="ft"><b>¥200.00</b></p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第1期）<br/><span>应还本金</span></p>
                <p slot="ft"><b>¥200.00</b></p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第1期）<br/><span>应还利息</span></p>
                <p slot="ft"><b>¥200.00</b></p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第1期）<br/><span class="s1">逾期5天</span></p>
                <p slot="ft"><b>¥200.00</b></p>
              </cell>
            </cells>
          </div>
          <div slot="ft" class="footer">
            <z-button> 
              <cell>
                <p slot="hd">合计(第1期)</p>
                <p slot="ft">¥<span class="amount">4,500</span></p>
              </cell>
            </z-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 提前结清
 */
export default {
  data () {
    return {}
  },
  components: {

  }
}
</script>
<style lang="less" scoped>
.white{
    background-color: #FFF;
}
.panel {
  padding: 0 0 0 .3rem;
  background: #fff;
  margin-top: 0.2rem;
  .panel-cell {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left:0;

    p {
      line-height: 2em;
      font-size: .28rem;
      span {
        color: #999999;
        font-size: 0.28rem;
      }
      .s1{
          color: #EC0000;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;

  button {
    color: rgba(0, 0, 0, 0.8);
    height: 1.1rem;
    background-color: #f9ca1a;
    font-family: 'SFUDinMitAlt';

    & > span {
      font-size: 0.4rem;
    }
    &:after {
      border: 0;
    }

    .amount{
      font-size: .50rem;
    }
  }
}
</style>