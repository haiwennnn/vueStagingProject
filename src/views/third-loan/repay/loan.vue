<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>借款记录</z-header>
        <div class="zz-tab__panel">
        <ul class="panel">
            <li v-for="(item,index) in borrowList"
              :key="index">
              <flexbox>
                <flexbox-item :flex="'1'">
                  <div class="left-col">
                    <b>分{{item.apply_terms}}期</b>
                    <span>申请时间</span>
                    <span>{{item.start_date | formatTime('yyyy.MM.dd')}}</span>
                  </div>
                </flexbox-item>
                <flexbox-item :flex="'1'">
                  <div class="mid-col">
                    <p>
                      <em>银行信息(2341)</em>
                    </p>
                    <p>信用卡</p>
                    <p>
                      <b>10000.00</b>
                    </p>
                    <p>每期还款：3405.33<br/>手续费：720</p>
                  </div>
                </flexbox-item>
                <flexbox-item :flex="'1'">
                  <p class="right-col">
                    <span :class="getStatus(item.status).statusStyle">{{getStatus(item.status).text}}</span>
                  </p>
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
    data() {
      return {
        borrowList: [],
        borrowStatusMapArr: [{
          keys: ['other'],
          text: '处理中',
          statusStyle: 's2',
          hasIou: false
        }, {
          keys: ['A00', 'A01'],
          text: '已还清',
          statusStyle: 's1',
          hasIou: true
        }, {
          keys: ['D01'],
          text: '未还清',
          statusStyle: 's2',
          hasIou: true
        }, {
          keys: ['K81', 'J98', 'FR0'],
          text: '取消申请',
          statusStyle: 's3',
          hasIou: false
        }, {
          keys: ['F81'],
          text: '放款取消',
          statusStyle: 's3',
          hasIou: false
        }, {
          keys: ['CR0', 'PR0', 'SR0', 'F99', 'FR0', 'ER0'],
          text: '失败',
          statusStyle: 's1',
          hasIou: false
        }]
      }
    },
    methods: {
      getStatus: function (status) {
        let data = this.borrowStatusMapArr
        let index = 0
        data.forEach(function (item, idx) {
          if (item.keys.indexOf(status) >= 0) {
            index = idx
          }
        })
        return data[index]
      },
      getBorrowList() {
        this.$http.ykdGet(this.$api.getBorrowList).then((res) => {
          if (+res.errorCode === 0) {
            this.borrowList = res.data
          } else {

          }
        })
      }
    },
    created() {
      this.getBorrowList()
    }
  }
</script>
<style lang="less" scoped>
  .panel {
    padding: 0 0.3rem;
    margin-top: 0.3rem;
    list-style: none;
    li {
      list-style: none;
      background-color: #fff;
      border-radius: 0.08rem;
      margin-bottom: 0.2rem;

      .left-col {
        background-color: #f9ca1a;
        width: 1.8rem;
        height: 3rem;
        border-top-left-radius: 0.08rem;
        border-bottom-left-radius: 0.08rem;
        text-align: center;

        &.settle {
          background-color: #aeaeae;
        }

        b,
        span {
          display: block;
        }
        b {
          padding: 0.6rem 0;
          font-size: 0.32rem;
          font-weight: 500;
        }
        span {
          font-size: 0.24rem;
        }
      }
      .mid-col {
        height: 2.6rem;
        padding-top: 0.4rem;
        p {
          font-size: 0.24rem;
          color: #999999;

          em {
            font-size: 0.28rem;
            color: #444444;
            font-style: normal;
          }
          b {
            font-family: "SFUDinMitAlt";
            font-size: 0.6rem;
            color: #000;
            font-weight: 200;
          }
        }
      }
      .right-col {
        text-align: right;
        padding-right: 0.4rem;
        font-size: 0.28rem;
        .s1 {
          color: #df6900;
        }
        .s2 {
          color: #376ce9;
        }
        .s3 {
          color: #aeaeae;
        }
      }
    }
  }
</style>


