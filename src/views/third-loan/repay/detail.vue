<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>
          <p class="title">还款详情<br/>
            <span>2017/05/04(第2期)</span>
          </p>
        </z-header>
        <div class="zz-tab__panel">
          <div slot="bd"
            class="panel">
            <cells class="panel-cells">
              <cell class="panel-cell-t">
                <p slot="hd">还款金额</p>
                <p slot="ft">
                  <b>¥{{repayRecordDetail.amount}}</b>
                </p>
              </cell>
              <cell class="panel-cell">
                <ul slot="hd">
                  <li>还款时间(自动)</li>
                  <li>还款产品</li>
                  <li>还款方式</li>
                  <li>还款银行</li>
                </ul>
                <ul slot="ft"
                  class="right">
                  <li>{{repayRecordDetail.returnTime | formatTime}}</li>
                  <li>{{repayRecordDetail.productName}}</li>
                  <li>{{repayRecordDetail.rMethod}}</li>
                  <li>{{repayRecordDetail.bankName}}({{repayRecordDetail.bancCardNo | bankcard4No }})</li>
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
                <ul slot="hd"
                  class="sign">
                  <li :class="{'active':item.completed}"
                    v-for="(item,index) in progress"
                    :key="index+'aa'">{{item.descript}}</li>
                </ul>
                <ul slot="ft"
                  class="right">
                  <li v-for="(item,index) in progress"
                    :key="index">{{item.time | formatTime}}</li>
                </ul>
              </cell>
              <cell class="panel-cell mini">
                <div slot="bd">
                  <!-- <p>• 失败原因：额度不足。</p>
                  <p>• 充值或添加新银行卡手动扣款</p>
                  <p>&nbsp;</p> -->
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
    data() {
      return {
        repayRecordDetail: null,
        progress: []
      }
    },
    created() {
      this.repayRecordDetail = this.$route.params.repayRecordDetail || {}
      if (this.repayRecordDetail.log_status === 'A0' || this.repayRecordDetail.log_status === 'A1') {
        this.progress = [{
          descript: '处理中',
          time: this.repayRecordDetail.returnTime,
          completed: true
        }, {
          descript: '',
          time: '',
          completed: false
        }]
      } else if (this.repayRecordDetail.log_status === 'A2') {
        this.progress = [{
          descript: '付款成功',
          time: this.repayRecordDetail.returnTime,
          completed: true
        }, {
          descript: '还款成功',
          time: this.repayRecordDetail.lastTime,
          completed: true
        }]
      } else {
        this.progress = [{
          descript: '还款失败',
          time: this.repayRecordDetail.returnTime,
          completed: false
        }, {
          descript: '',
          time: '',
          completed: false
        }]
      }
      console.log(this.progress)
    }
  }
</script>
<style lang="less" scoped>
  .title {
    line-height: 1.1em;
    padding-top: 0.1rem;

    span {
      font-size: 0.2rem;
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

      &.borderLeft::after {
        left: 0.3rem;
      }

      p {
        color: #000;
        line-height: 2em;
        font-size: 0.32rem;
        b {
          font-size: 0.48rem;
        }
        span {
          color: #999999;
          font-size: 0.28rem;
        }
        .s1 {
          color: #ec0000;
        }
      }
      ul {
        font-size: 0.28rem;
        list-style: none;
        color: #000;
        li {
          list-style: none;
          height: 0.8rem;
          line-height: 0.4rem;
        }
      }
      ul.right {
        text-align: right;
        color: #999;
      }

      &.mini {
        p,
        ul {
          font-size: 0.24rem;
        }

        ul.sign {
          & > li {
            padding-left: 0.8rem;
            position: relative;

            &::before {
              content: "";
              position: absolute;
              width: 0.1rem;
              height: 0.1rem;
              background-color: #d8d8d8;
              border-radius: 100%;
              border: 0.15rem solid #d8d8d8;
              left: 0;
              z-index: 2;
            }

            &::after {
              content: "";
              position: absolute;
              width: 0.04rem;
              height: 100%;
              background: #d8d8d8;
              left: 0.18rem;
              top: -100%;
              z-index: 1;
            }
          }

          & > li:first-child {
            &::after {
              height: 0;
            }
          }

          & > li.active {
            &::before {
              background-color: #444;
              border-color: #f9ca1a;
            }
            &::after {
              background-color: #f9ca1a;
            }
          }
        }
      }
    }
  }
</style>