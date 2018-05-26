<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>还款</z-header>
        <div class="zz-tab__panel">
          <div class="repay-index__top">
            <div class="repay-detail">
              <p>剩余还款金额</p>
              <div class="repay-amount">&yen;1200.11</div>
              <div class="repay-date">还款日期：2018.03.08-2018.03.20</div>
            </div>
            <div class="zz-cells">
              <label class="zz-cell zz-check-label zz-cell_radio">
                <div class="zz-cell__hd">
                  <img src="../../assets/repay/bankcard.png" style="display: block;width: .4rem;">
                </div>
                <div class="zz-cell__bd">
                  <p>银行卡付款</p>
                </div>
                <div class="zz-cell__ft">
                  <span class="iconfont icon-circle"></span>
                  <span class="iconfont icon-circle-hook"></span>
                </div>
              </label>
              <div class="zz-cell zz-cell_access">
                <div class="zz-cell__hd"></div>
                <div class="zz-cell__bd">
                  <p>招商银行(2402)</p>
                </div>
                <div class="zz-cell__ft">
                </div>
              </div>
            </div>
            <div class="zz-cells" style="margin-top:.4rem;">
              <label class="zz-cell zz-check-label zz-cell_radio">
                <div class="zz-cell__hd">
                  <img src="../../assets/repay/alipay.png" style="display: block;width: .4rem;">
                </div>
                <div class="zz-cell__bd">
                  <p>支付宝付款</p>
                </div>
                <div class="zz-cell__ft">
                  <span class="iconfont icon-circle"></span>
                  <!-- <span class="iconfont icon-circle-hook"></span> -->
                </div>
              </label>
            </div>
            <div class="more-repay-methods">
              <p>更多还款方式
                <span class="iconfont icon-arrow-down"></span>
              </p>
            </div>
            <!-- <div class="zz-cells zz-cells-radio" style="margin-top: 0;">
              <label class="zz-cell zz-check-label" for="rr1">
                <div class="zz-cell-hd">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                </div>
                <div class="zz-cell-bd">银行卡支付</div>
                <div class="zz-cell-ft">
                  <input class="zz-radio" type="radio" name="radio2" id="rr1">
                  <i class="icon ion-android-done"></i>
                </div>
              </label>
            </div> -->

            <!-- <div class="zz-cells zz-cells-radio" style="margin-top: 0;">
              <label class="zz-cell zz-check-label" for="rr2">
                <div class="zz-cell-hd">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                </div>
                <div class="zz-cell-bd">支付宝支付</div>
                <div class="zz-cell-ft">
                  <input class="zz-radio" type="radio" name="radio2" id="rr2">
                  <i class="icon ion-android-done"></i>
                </div>
              </label>
            </div> -->
          </div>
        </div>
        <div class="repay-button">
          <button class="zz-btn">确认还款
            <span class="repay-button-amount">&yen;1200.11</span>
          </button>
        </div>
      </div>
    </div>
    <div class="zz-mask"></div>
    <div class="zz-dialog">
      <div class="zz-dialog__hd">
        <span>选择支付银行卡</span>
        <i class="iconfont icon-close zz-dialog-close"></i>
      </div>
      <div class="zz-dialog__bd">
        <div class="zz-cells">
          <label class="zz-cell zz-check-label zz-cell_radio">
            <div class="zz-cell__hd">
              <img src="../../assets/repay/bankcard.png" style="display: block;width: .4rem;">
            </div>
            <div class="zz-cell__bd">
              <p>招商银行(2240)</p>
            </div>
            <div class="zz-cell__ft">
              <span class="iconfont icon-circle"></span>
              <span class="iconfont icon-circle-hook"></span>
            </div>
          </label>
          <label class="zz-cell zz-check-label zz-cell_radio">
            <div class="zz-cell__hd">
              <img src="../../assets/repay/bankcard.png" style="display: block;width: .4rem;">
            </div>
            <div class="zz-cell__bd">
              <p>招商银行(2241)</p>
            </div>
            <div class="zz-cell__ft">
              <span class="iconfont icon-circle"></span>
            </div>
          </label>
          <div class="zz-cell zz-cell_access">
            <div class="zz-cell__hd"></div>
            <div class="zz-cell__bd">
              <p>使用新卡支付</p>
            </div>
            <div class="zz-cell__ft">
            </div>
          </div>
        </div>
      </div>
      <div class="zz-dialog__ft">
        <!-- <a href="javascript:;" class="zz-dialog-btn">辅助操作</a>
        <a href="javascript:;" class="zz-dialog-btn">主操作</a>
        <a href="javascript:;" class="zz-dialog-btn zz-dialog-btn_warn">其他操作</a> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.repay-index-page {
  .zz-tab__panel {
    padding-bottom: 1rem;
  }
  .repay-button {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    .zz-btn {
      height: 1rem;
      line-height: 1rem;
      border-radius: 0;
      background-color: #fc834e;
      font-size: 0.32rem;
    }
    .repay-button-amount {
      padding-left: 0.15rem;
      font-size: 0.4rem;
    }
  }
  .repay-detail {
    width: 6.3rem;
    height: 2.5rem;
    margin: 0.4rem auto;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    text-align: center;
    p {
      line-height: 0.33rem;
      padding-top: 0.4rem;
      font-size: 0.26rem;
      color: #222222;
      opacity: 0.5;
    }
    .repay-amount {
      line-height: 0.52rem;
      padding: 0.25rem 0;
      font-size: 0.48rem;
      color: #222222;
    }
    .repay-date {
      line-height: 0.33rem;
      // padding-top: 0.2rem;
      font-size: 0.26rem;
      color: #222222;
      opacity: 0.5;
    }
  }
  .zz-cell {
    padding: 0.35rem 0.3rem;
  }
  .more-repay-methods {
    line-height: 0.5rem;
    padding: 0.3rem;
    text-align: center;
    text-align: center;
    background-color: #fff;
    font-size: 0.26rem;
    color: #666666;
  }
}
</style>
