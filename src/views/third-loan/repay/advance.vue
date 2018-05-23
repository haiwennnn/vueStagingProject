<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>提前结清</z-header>
        <div class="zz-tab__panel">
          <cells noTopLine>
            <div class="amount">
              <p>
                <span>剩余应还</span>
              </p>
              <p>
                <i>¥</i> 4,500</p>
            </div>
          </cells>
          <div slot="bd" class="panel">
            <cell class="panel-cell-t">
              <p slot="hd"><img src="../../../assets/repay/bankcard.png" style="display: block;width: .4rem;"></p>
              <p slot="bd">
                <b>还款银行卡</b><br/>
                <span>每月21日凌晨自动扣款</span>
              </p>
            </cell>
            <cells noTopLine>
              <cell class="panel-cell">
                <p slot="hd"><img src="../../../assets/repay/bankcard.png" style="display: block;width: .4rem;"></p>
                <p slot="bd">招商银行(2420)</p>
                <p slot="ft">
                  <i class="ionicons ion-ios-circle-outline"></i>
                </p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd"><img src="../../../assets/repay/bankcard.png" style="display: block;width: .4rem;"></p>
                <p slot="bd">招商银行(2420)</p>
                <p slot="ft">
                  <i class="ionicons ion-ios-circle-filled"></i>
                </p>
              </cell>
              <cell class="panel-cell">
                <p slot="hd">
                  <i class="ionicons ion-plus-circled"></i>
                </p>
                <p slot="bd">添加银行卡</p>
              </cell>
            </cells>
          </div>
          <div slot="ft" class="footer">
            <z-button>立即还款 ¥
              <span>4,500</span>
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
.amount {
  text-align: center;
  color: #222;
  font-size: 0.8rem;
  line-height: 1em;
  padding: 0.3rem 0 0.5rem;
  font-family: 'SFUDinMitAlt';

  span {
    font-size: 0.26rem;
    color: #888;
    line-height: 1.7em;
  }
  i {
    font-size: 0.3rem;
    font-style: normal;
  }
}
.panel {
  padding: 0 0.3rem;
  background: #fff;
  margin-top: 0.2rem;

  .panel-cell-t {
    padding-left: 0;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;

    p {
      line-height: 1em;
      span {
        color: #999999;
        font-size: 0.2rem;
      }
    }
  }
  .panel-cell {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;

    p {
      line-height: 1em;
      span {
        color: #999999;
        font-size: 0.2rem;
      }
    }

    i.ion-ios-circle-filled {
      font-size: 0.48rem;
      color: #ff7734;
    }
    i.ion-ios-circle-outline {
      font-size: 0.48rem;
      color: #ccc;
    }
    i.ion-plus-circled {
      font-size: 0.4rem;
      color: #3f5c99;
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
  }
}
</style>