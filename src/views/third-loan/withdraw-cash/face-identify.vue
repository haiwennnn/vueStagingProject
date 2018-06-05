<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>人脸识别</z-header>
      <div class="zz-tab__panel">
        <div class="face-identify-panel">
          <div class="demo-1">
            <p>录制一段朗读如下数字的视频</p>
            <ul>
              <li>请使用
                <b>前置摄像头</b>
              </li>
              <li>请用
                <b>普通话</b>读
                <b>一遍</b>
              </li>
              <li>视频时长
                <b>3-5秒</b>
              </li>
            </ul>
            <div>{{faceInfo.randomCode.randomNumber}}</div>
          </div>
          <div class="demo-2">
            <div class="demo-2-item">
              <span></span>
              <p>&nbsp;</p>
            </div>
            <div class="demo-2-item"
              @click="showFaceDemo = true">
              <span></span>
              <p>查看
                <span>录制须知</span>
              </p>
            </div>
          </div>
        </div>
        <div class="face-demo"
          v-if="showFaceDemo">
          <div class="demo-mask"></div>
          <img @click="showFaceDemo = false"
            src="../../../assets/withdraw-cash/face-id-demo-02.png"
            alt="">
        </div>
        <div class="next-btn">
          <label class="zz-btn zz-btn_default primary">开始验证
            <input name='video'
              type='file'
              id='video-input'
              accept='video/*'
              capture='camcorder'
              ref="uploadVideoInput"
              @change="userCatchCamera" /></label>
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
      return {
        loanId: '18060111091345500',
        showFaceDemo: false,
        faceInfo: {
          randomCode: {
            requestId: '',
            timeUsed: '',
            bizNo: '',
            tokenRandomNumber: '',
            randomNumber: '',
            errorMessage: ''
          },
          uploadVideo: {
            tokenVideo: '',
            requestId: '',
            timeUsed: '',
            bizNo: '',
            errorMessage: ''
          }
        }
      }
    },
    methods: {
      userCatchCamera(e) {
        let vm = this
        let target = e.target
        let files = target.files
        let reader = new FileReader()
        reader.onload = function (e) {
          vm.$refs.uploadVideoInput.value = ''
          console.log(e.target)
          // console.log(e.target.result)
          vm.uploadFaceVideo(e.target.result)
        }
        reader.readAsDataURL(files[0])
      },
      /**
       * 获取人脸识别随机数
       */
      getFaceRandom() {
        this.$http.post(this.$api.getFaceRandom, {
          data: {
            loanId: this.loanId
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            let data = res.data
            let randomCodeInfo = {}
            randomCodeInfo.requestId = data.request_id
            randomCodeInfo.bizNo = data.biz_no
            randomCodeInfo.tokenRandomNumber = data.token_random_number
            randomCodeInfo.randomNumber = data.random_number
            randomCodeInfo.errorMessage = data.error_message
            this.$set(this.faceInfo, 'randomCode', randomCodeInfo)
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      uploadFaceVideo(videoContent) {
        this.$http.post(
          this.$api.uploadFaceVideo,
          {
            data: {
              loanId: this.loanId,
              biz_no: this.faceInfo.randomCode.bizNo,
              token_random_number: this.faceInfo.randomCode.tokenRandomNumber,
              video_content: videoContent.split(',')[1]
            },
            timeout: 60000
          },
          {
            toastText: '正在上传视频'
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            let data = res.data
            let uploadVideo = {}
            uploadVideo.tokenVideo = data.token_video
            uploadVideo.requestId = data.request_id
            uploadVideo.bizNo = data.biz_no
            uploadVideo.errorMessage = data.error_message
            this.$set(this.faceInfo, 'uploadVideo', uploadVideo)
            this.$zzz.toast.show({
              text: '视频上传成功',
              type: 'done',
              position: 'middle',
              time: 0,
              isShowMask: true
            })
            // 间隔1秒，请求是否完成人脸识别
            setTimeout(() => {
              this.getFaceResult()
            }, 1000)
          } else {
            this.$zzz.toast.text('实名认证失败，请重新认证')
          }
        })
      },
      getFaceResult() {
        this.$http.post(this.$api.getFaceResult, {
          data: {
            loanId: this.loanId,
            biz_no: this.faceInfo.uploadVideo.bizNo,
            token_video: this.faceInfo.uploadVideo.tokenVideo
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            this.$zzz.toast.text('恭喜人脸识别成功')
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    },
    created() {
      let walletLoanInfo = window.FJ.getStore('walletLoanInfo')
      this.loanId = walletLoanInfo.loanId
      this.getFaceRandom()
    }
  }
</script>
<style lang="less" scoped>
  .face-demo {
    position: absolute;
    top: 0.45rem;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    z-index: 200;
    .demo-mask {
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      z-index: 101;
    }
  }
  .demo-1 {
    width: 6.5rem;
    height: 4.48rem;
    margin: 0.6rem auto;
    border: 0.1rem solid #eaeaea;
    border-radius: 0.4rem;
    background-color: #fdfdfd;
    font-size: 0.32rem;
    color: #525252;

    p {
      line-height: 3em;
      text-align: center;
    }
    ul {
      padding-left: 3.3rem;
      color: #7a7a7a;
      line-height: 1.8em;
      background-image: url("../../../assets/withdraw-cash/face-id-demo-01.png");
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: 20% 50%;
      b {
        color: #e9646b;
      }
    }
    & > div {
      text-align: center;
      font-size: 1.5rem;
      line-height: 1.2em;
      font-family: Arial;
      font-weight: 600;
      letter-spacing: 0.1rem;
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
    padding: 0.3rem 1rem;
    height: 0.84rem;
    margin-top: 0.8rem;
    .zz-btn {
      height: 100%;
      border-radius: 2em;
      background-color: #f9ca1a;
      color: #444444;

      input {
        display: none;
      }
    }
  }
</style>

