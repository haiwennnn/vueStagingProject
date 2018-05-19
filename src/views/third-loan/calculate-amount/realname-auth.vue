<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>实名认证</z-header>
      <div class="zz-tab__panel">
        <div class="scan-area">
          <flexbox :gutter="60">
            <flexbox-item :flex="'1'">
              <div class="scan-trigger-area"></div>
            </flexbox-item>
            <flexbox-item :flex="'1'">
              <div class="scan-trigger-area"></div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="scan-example">
          <div class="title">拍摄示例</div>
        </div>
        <div class="scan-result">
          <cells :noTopLine="true">
            <cell>
              <div class="scan-result-label"
                slot="hd">姓名</div>
              <div slot="bd">
                <p>李四</p>
              </div>
            </cell>
            <cell>
              <div class="scan-result-label"
                slot="hd">身份证号</div>
              <div slot="bd">
                <p>李四</p>
              </div>
            </cell>
            <cell>
              <div class="scan-result-label"
                slot="hd">地址</div>
              <div slot="bd">
                <p>李四</p>
              </div>
            </cell>
            <cell>
              <div class="scan-result-label"
                slot="hd">签发机构</div>
              <div slot="bd">
                <p>李四</p>
              </div>
            </cell>
            <cell>
              <div class="scan-result-label"
                slot="hd">有效期</div>
              <div slot="bd">
                <p>李四</p>
              </div>
            </cell>
          </cells>
          <p class="descript">*请核对信息,如识别有误可再次拍照识别,核对无误后请点击下一步</p>
        </div>
        <div class="next-btn">
          <z-button type="primary">下一步</z-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 实名认证
   */
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .zz-tab__panel {
    background-color: #fff;
  }
  .scan-area {
    width: 7rem;
    margin: 0.2rem auto 0;
  }
  .scan-trigger-area {
    height: 2rem;
    background-color: #ccc;
  }
  .scan-example {
    position: relative;
    width: 6.6rem;
    height: 1.92rem;
    margin: 0.4rem auto 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    .title {
      position: absolute;
      top: 0;
      left: 0.3rem;
      height: 0.38rem;
      line-height: 0.38rem;
      padding: 0 0.1rem;
      font-size: 0.26rem;
      color: #333333;
      background-color: #fff;
      transform: translateY(-50%);
    }
  }
  .scan-result {
    margin-left: 0.3rem;
    margin-top: 0.4rem;
    .scan-result-label {
      width: 1.4rem;
      height: 0.48rem;
      line-height: 0.48rem;
      padding-right: 0.2rem;
      text-align: justify;
      color: #222;
      overflow: hidden;
      &:after {
        display: inline-block;
        content: "123";
        width: 100%;
      }
    }
    .zz-cell {
      padding-left: 0;
    }
    .zz-cell__bd {
      color: #666;
    }
  }
  .next-btn {
    height: 0.84rem;
    margin: 0.6rem 0.3rem 0;
    padding-bottom: 0.3rem;
  }
</style>

