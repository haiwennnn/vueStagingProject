<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>还款记录</z-header>
        <div class="zz-tab__panel white">
          <div slot="bd"
            class="panel">
            <cells noTopLine>
              <cell class="panel-cell"
                @on-cell-item-click="repayItemClick(index)"
                v-for="(item,index) in repayRecords"
                :key="index">
                <p slot="hd">{{item.returnTime | formatTime}}<br/>
                  <span>{{item.bankName}} ({{item.bancCardNo | bankcard4No }})
                  </span>
                </p>
                <p slot="ft">
                  <b>&yen;{{item.amount}}</b>
                  <br/>
                  <span class="s1">{{RepayStatusMap[item.log_status]}}</span>
                </p>
              </cell>
              <!-- <cell class="panel-cell">
                <p slot="hd">2017/05/04 （第2期）<br/>
                  <span>招商银行（2341）</span>
                </p>
                <p slot="ft">
                  <b>¥200.00</b>
                  <br/>
                  <span class="s2">代扣成功</span>
                </p>
              </cell> -->
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
        repayRecords: [],
        RepayStatusMap: {
          'A0': '处理中',
          'A1': '处理中',
          'B1': '还款失败',
          'A2': '还款成功',
          'A5': '处理中',
          'A9': '还款失败'
        },
        styleMap: {
          'A0': 'text-default',
          'A1': 'text-default',
          'B1': 'text-light',
          'A2': 'text-default',
          'A5': 'text-default',
          'A9': 'text-light'
        }
      }
    },
    methods: {
      getRecords() {
        this.$http.ykdGet(this.$api.getRecords).then((res) => {
          console.log(res)
          if (+res.errorCode === 0) {
            this.repayRecords = res.data
          }
        })
      },
      repayItemClick(index) {
        let repayRecordDetail = this.repayRecords[index]
        console.log(repayRecordDetail)
        this.$router.push({
          name: 'thirdRepayDetail',
          params: {
            repayRecordDetail
          }
        })
      }
    },
    created() {
      this.getRecords()
    }
  }
</script>
<style lang="less" scoped>
  .white {
    background-color: #fff;
  }
  .panel {
    padding: 0 0 0 0.3rem;
    background: #fff;
    margin-top: 0.2rem;
    .panel-cell {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      padding-left: 0;

      p {
        line-height: 2em;
        font-size: 0.28rem;
        span {
          color: #999999;
          font-size: 0.28rem;
        }
        .s1 {
          color: #ec0000;
        }
      }
    }
  }
</style>