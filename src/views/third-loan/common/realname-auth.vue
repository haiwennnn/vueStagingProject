<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>实名认证</z-header>
      <div class="zz-tab__panel">
        <div class="scan-area">
          <flexbox :gutter="60">
            <flexbox-item :flex="'1'"
              @on-item-click="scanFront">
              <div class="scan-trigger-area">
                <img v-if="frontIdCardBase64"
                  :src="frontIdCardBase64"
                  alt="">
              </div>
            </flexbox-item>
            <flexbox-item :flex="'1'"
              @on-item-click="scanBack">
              <div class="scan-trigger-area">
                <img v-if="backIdCardBase64"
                  :src="backIdCardBase64"
                  alt="">
              </div>
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
        <div class="next-btn"
          @click="goAddInfo">
          <z-button type="primary">下一步</z-button>
        </div>
        <canvas ref="canvas"
          style="display:none;"></canvas>
        <input type="file"
          name="file"
          ref="uploadFile"
          style="display:none;"
          @change="userChooseImage">
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
      return {
        // 正面base64
        frontIdCardBase64: '',
        // 反面base64
        backIdCardBase64: '',
        // 扫描类型 [1,2] => [正面,背面]
        currentTriggerType: 0
      }
    },
    methods: {
      goAddInfo() {
        this.$router.push({
          name: 'addInfo'
        })
      },
      /**
       * 根据扫描类型的不同对数据进行相应的处理
       */
      transformOcrData() {

      },
      /**
       * 图片转换成base64提交到后台识别
       */
      uploadImgToOcr(Imgcontent) {
        this.$http.post(this.$api.userIdCardOcr, {
          data: {
            imageContent: Imgcontent,
            ocrMode: this.currentTriggerType
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            this.transformOcrData(res.data)
          } else {

          }
        })
      },
      /**
       * 用户选择后图片回调
       * 1.使用FileReader加载文件
       * 2.文件加载完成，创建Img对象加载文件对象结果
       * 3.img对象加载图片成功，画入canvas导出高度1280(宽度按原图比例缩放)尺寸图片
       */
      userChooseImage(e) {
        let vm = this
        let target = e.target
        let files = target.files
        let canvas = this.$refs.canvas
        // let uploadType = this.uploadType
        let scale = 0.7
        let baseWidth = 1280
        let reader = new FileReader()
        reader.onload = function (e) {
          var that = this
          var img = new Image()
          img.onload = function () {
            canvas.width = baseWidth
            canvas.height = this.height * (1280 / this.width)
            let ctxs = canvas.getContext('2d')
            ctxs.drawImage(img, 0, 0, this.width, this.height, 0, 0, baseWidth, this.height * (1280 / this.width))
            var dataUrl = canvas.toDataURL('image/jpeg', scale)
            if (vm.currentTriggerType === 1) {
              vm.frontIdCardBase64 = dataUrl
            } else {
              vm.backIdCardBase64 = dataUrl
            }
            // TODO:调用服务器接口进行身份证识别
          }
          setTimeout(function () {
            img.src = that.result
          }, 800)
        }
        reader.readAsDataURL(files[0])
      },
      /**
       * 扫描银行卡正面
       */
      scanFront() {
        this.currentTriggerType = 1
        this.triggerFileInput()
      },
      /**
       * 扫描身份证背面
       */
      scanBack() {
        this.currentTriggerType = 2
        this.triggerFileInput()
      },
      /**
       * 触发fileinput节点，用户选择资源
       */
      triggerFileInput() {
        this.$refs.uploadFile.click()
        this.$refs.uploadFile.click()
      }
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
    position: relative;
    height: 2rem;
    background-color: #ccc;
    overflow: hidden;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: auto;
      transform: translate(-50%, -50%);
    }
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

