<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header><p class="title">还款详情<br/><span>2017/05/04(第2期)</span></p></z-header>
        <div class="zz-tab__panel">
          <div slot="bd" class="panel">
            <cells class="panel-cells">
              <cell class="panel-cell-t">
                <p slot="hd">还款金额</p>
                <p slot="ft">
                  <b>¥200.00</b>
                </p>
              </cell>
              <cell class="panel-cell">
                <ul slot="hd">
                  <li>还款时间(自动)</li>
                  <li>还款产品</li>
                  <li>还款方式</li>
                  <li>还款银行</li>
                </ul>
                <ul slot="ft" class="right">
                  <li>2018-04-08 12:00:00</li>
                  <li>云保贷</li>
                  <li>等额本息</li>
                  <li>招商银行（2341）</li>
                </ul>
              </cell>
            </cells>
            <cells class="panel-cells">
              <cell class="panel-cell-t">
                <p slot="hd">还款进度</p>
                <p slot="ft">
                </p>
              </cell>
              <cell class="panel-cell mini borderLeft">
                <ul slot="hd" class="sign">
                  <li class="active">发起还款</li>
                  <li>还款成功</li>
                </ul>
                <ul slot="ft" class="right">
                  <li>2018-04-08 12:00:00</li>
                  <li>2018-04-08 12:00:00</li>
                </ul>
              </cell>
              <cell class="panel-cell mini">
                <div slot="bd">
                  <p>• 失败原因：额度不足。</p>
                  <p>• 充值或添加新银行卡手动扣款</p>
                  <p>&nbsp;</p>
                </div>
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
.title{
  line-height: 1.1em;
  padding-top:.10rem;

  span{
    font-size:.20rem;
    color: #222;
  }
}

.panel {
  padding: 0;
  .panel-cells {
    margin-top: 0.4rem;
  }
  .panel-cell-t {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .panel-cell {
    padding-top: 0.3rem;
    padding-bottom: 0;

    &.borderLeft::after{
      left:.3rem;
    }

    p {
      color: #000;
      line-height: 2em;
      font-size: .32rem;
      b{
        font-size:.48rem;
      }
      span {
        color: #999999;
        font-size: 0.28rem;
      }
      .s1{
          color: #EC0000;
      }
    }
    ul{
      font-size: .28rem;
      list-style: none;
      color: #000;
      li{
        list-style: none;
        height: .8rem;
        line-height: .4rem;
      }
    }
    ul.right{
      text-align: right;
      color: #999;
    }

    &.mini{
      p,ul{
        font-size: .24rem;
      }

      ul.sign{
        &>li{
          padding-left: .80rem;
          position: relative;

          &::before{
            content:'';
            position: absolute;
            width: .1rem;
            height: .1rem;
            background-color: #D8D8D8;
            border-radius: 100%; 
            border: 0.15rem solid #D8D8D8;
            left: 0;
            z-index: 2;
          }

          &::after{
            content:'';
            position: absolute;
            width: .04rem;
            height: 100%;
            background: #D8D8D8;
            left: .18rem;
            top: -100%;
            z-index: 1;
          }
        }

        &>li:first-child{
           &::after{
             height:0;
           }
        }

        &>li.active{
          &::before{
            background-color: #444 ;
            border-color: #F9CA1A ;
          }
          &::after{
            background-color: #F9CA1A ;
          }
        }
      }

    }
  }
}
</style>