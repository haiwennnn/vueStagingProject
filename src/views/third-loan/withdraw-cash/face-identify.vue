<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>人脸识别</z-header>
      <div class="zz-tab__panel">
        <div class="face-identify-panel">
          <div class="demo-1">
            <p>请正对手机，进行人脸验证</p>
          </div>
          <div class="demo-2">
            <div class="demo-2-item">
              <span></span>
              <p>请不要戴眼镜和帽子</p>
            </div>
            <div class="demo-2-item">
              <span></span>
              <p>光线不要太暗</p>
            </div>
          </div>
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
   * 人脸认证
   */
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .demo-1 {
    width: 3.5rem;
    height: 4.88rem;
    margin: 0.6rem auto;
  }
  .demo-2 {
    overflow: hidden;
    & > div {
      float: left;
      width: 50%;
      text-align: center;
    }
  }
  .next-btn {
    height: 1rem;
    margin-top: .8rem;
    .zz-btn {
      height: 100%;
    }
  }
</style>

