<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>人脸识别</z-header>
      <div class="zz-tab__panel">
        <div class="face-identify-panel">
          <div class="demo-1">
            <p>录制一段朗读如下数字的视频</p>
            <ul>
              <li>请使用<b>前置摄像头</b></li>
              <li>请用<b>普通话</b>读<b>一遍</b></li>
              <li>视频时长<b>3-5秒</b></li>
            </ul>
            <div>6659</div>
          </div>
          <div class="demo-2">
            <div class="demo-2-item">
              <span></span>
              <p>&nbsp;</p>
            </div>
            <div class="demo-2-item">
              <span></span>
              <p>查看<span>录制须知</span></p>
            </div>
          </div>
        </div>
        <div class="next-btn">
            <label class="zz-btn zz-btn_default primary">开始验证<input name='video' type='file' id='video-input'
                           accept='video/*'
                           capture='camcorder'/></label>
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
    width: 6.5rem;
    height: 4.48rem;
    margin: 0.6rem auto;
    border: .10rem solid #EAEAEA;
    border-radius: .40rem;
    background-color: #FDFDFD;
    font-size: .32rem;
    color: #525252;

    p{
      line-height: 3em;
      text-align: center;
    }
    ul{
      margin-left: 3.30rem; 
      color: #7A7A7A;
      line-height: 1.8em;

      b{
        color: #E9646B;
      }
    }
    &>div{
      text-align: center;
      font-size: 1.50rem;
      line-height: 1.2em;
      font-family: Arial;
      font-weight: 600;
      letter-spacing: .10rem;
      color: #444;
    }
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
    padding: .30rem 1rem;
    height: .84rem;
    margin-top: .8rem;
    .zz-btn {
      height: 100%;
      border-radius: 2em;
      background-color: #F9CA1A;
      color: #444444;

      input{
        display: none;
      }
    }
  }
</style>

