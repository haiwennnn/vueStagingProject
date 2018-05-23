<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>还款记录</z-header>
        <div class="zz-tab__panel white">
          <div slot="bd" class="panel">
            <cells noTopLine>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第2期）<br/><span>招商银行（2341）</span></p>
                <p slot="ft">
                  <b>¥200.00</b>
                  <br/><span class="s1">代扣失败</span>
                </p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第2期）<br/><span>招商银行（2341）</span></p>
                <p slot="ft">
                  <b>¥200.00</b>
                  <br/><span class="s2">代扣成功</span>
                </p>
              </cell>
            </cells>
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
  padding: 0 0 0 0.3rem;
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
</style>