<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>借款记录</z-header>
        <div class="zz-tab__panel">
          <ul class="panel">
              <li>
                <flexbox>
                    <flexbox-item :flex="'1'">
                        <div class="left-col">
                            <b>分3期</b>
                            <span>申请时间</span>
                            <span>2017.04.22</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item :flex="'1'">
                        <div class="mid-col">
                            <p><em>招商银行(2341)</em></p>
                            <p>信用卡</p>
                            <p><b>10000.00</b></p>
                            <p>每期还款：3405.33<br/>手续费：720</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item :flex="'1'">
                        <p class="right-col"><span class="s1">处理中</span></p>
                    </flexbox-item>
                </flexbox>
              </li>
              <li>
                <flexbox>
                    <flexbox-item :flex="'1'">
                        <div class="left-col">
                            <b>分3期</b>
                            <span>申请时间</span>
                            <span>2017.04.22</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item :flex="'1'">
                        <div class="mid-col">
                            <p><em>招商银行(2341)</em></p>
                            <p>信用卡</p>
                            <p><b>10000.00</b></p>
                            <p>每期还款：3405.33<br/>手续费：720</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item :flex="'1'">
                        <p class="right-col"><span class="s2">已放款</span></p>
                    </flexbox-item>
                </flexbox>
              </li>
              <li>
                <flexbox>
                    <flexbox-item :flex="'1'">
                        <div class="left-col settle">
                            <b>分3期</b>
                            <span>申请时间</span>
                            <span>2017.04.22</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item :flex="'1'">
                        <div class="mid-col">
                            <p><em>招商银行(2341)</em></p>
                            <p>信用卡</p>
                            <p><b>10000.00</b></p>
                            <p>每期还款：3405.33<br/>手续费：720</p>
                        </div>
                    </flexbox-item>
                    <flexbox-item :flex="'1'">
                        <p class="right-col"><span class="s3">已结清</span></p>
                    </flexbox-item>
                </flexbox>
              </li>
          </ul>
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
.panel {
  padding: 0 0.3rem;
  margin-top: 0.3rem;
  list-style: none;
  li{
      list-style: none;
      background-color: #FFF;
      border-radius: .08rem;
      margin-bottom: .20rem;

      .left-col{
          background-color: #F9CA1A;
          width:1.80rem;
          height:3.00rem;
          border-top-left-radius: 0.08rem;
          border-bottom-left-radius: 0.08rem;
          text-align: center;

          &.settle{
              background-color: #AEAEAE;
          }

          b,span{
              display: block;
          }
          b{
              padding: .6rem 0;
              font-size: .32rem;
              font-weight: 500;
          }
          span{
              font-size: .24rem;
          }
      }
      .mid-col{
          height: 2.6rem;
          pading-top: 0.4rem;
          p{
            font-size: .24rem;
            color: #999999;

            em{
                font-size: .28rem;
                color: #444444;
                font-style: normal;
            }
            b{
                font-family: 'SFUDinMitAlt';
                font-size: .60rem;
                color: #000;
                font-weight: 200;
            }
          }
      }
      .right-col{
          text-align: right;
          padding-right: .4rem;
          font-size: .28rem;
          .s1{
            color: #DF6900;
          }
          .s2{
            color: #376CE9;
          }
          .s3{
            color: #AEAEAE;
          }
      }
  }
}
</style>


