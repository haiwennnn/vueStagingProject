<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>绑定银行卡</z-header>
      <div class="zz-tab__panel">
        <div class="scan-area">
          <flexbox :gutter="60">
            <flexbox-item :flex="'1'"
              @on-item-click="scanFront">
              <div class="scan-trigger-area">
                <div class="trigger-tip"
                  v-if="!frontCardBase64">
                  <i class="ion ion-ios-camera"></i>
                  <br>
                  <span>拍摄银行卡正面</span>
                </div>
                <img v-if="frontCardBase64"
                  :src="frontCardBase64"
                  alt="">
              </div>
            </flexbox-item>
            <flexbox-item :flex="'1'"
              @on-item-click="scanBack">
              <div class="scan-trigger-area">
                <div class="trigger-tip"
                  v-if="!backCardBase64">
                  <i class="ion ion-ios-camera"></i>
                  <br>
                  <span>拍摄银行卡背面</span>
                </div>
                <img v-if="backCardBase64"
                  :src="backCardBase64"
                  alt="">
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="scan-result"
          v-if="scanBankcardInfo">
          <cells-title>请核对您的银行卡信息，如有错误请重新识别</cells-title>
          <cells :noTopLine="true">
            <cell>
              <div class="scan-result-label"
                slot="hd">卡类型</div>
              <div slot="bd">
                <p>{{scanBankcardInfo.bankName}} {{scanBankcardInfo.cardType}}</p>
              </div>
            </cell>
            <cell>
              <div class="scan-result-label"
                slot="hd">银行卡号</div>
              <div slot="bd">
                <p>{{scanBankcardInfo.cardNumber}}</p>
              </div>
            </cell>
          </cells>
          <cells-title>请确认您的开户行是否正确</cells-title>
          <cells :noTopLine="true">
            <cell>
              <div class="scan-result-label"
                slot="hd">开户行</div>
              <div slot="bd">
                <p>{{scanBankcardInfo.bankName}}</p>
              </div>
            </cell>
          </cells>
          <cells-title>请获取验证码进行银行卡绑定</cells-title>
          <cells :noTopLine="true">
            <cell>
              <div class="scan-result-label"
                slot="hd">姓名</div>
              <div slot="bd">
                <p>{{userInfo.userName}}</p>
              </div>
            </cell>
            <cell>
              <div class="scan-result-label"
                slot="hd">手机号</div>
              <div slot="bd">
                <p>{{userInfo.phone}}</p>
              </div>
            </cell>
            <!-- <cell>
              <div class="scan-result-label"
                slot="hd">验证码</div>
              <div slot="bd">
                <p></p>
              </div>
            </cell> -->
          </cells>
          <z-form>
            <form-item class="input-sms-code"
              label="验证码"
              :labelWidth="160">
              <input type="text"
                class="zz-input"
                placeholder="请输入短信验证码"
                v-model.trim="smsCode.value">
              <div slot="ft"
                class="sms-code-btn"
                @click="getSmsCode">{{smsCode.text}}</div>
            </form-item>
          </z-form>
        </div>
        <div class="next-btn"
          v-if="scanBankcardInfo"
          @click="bindBankcard">
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
  import { BANKCARDDICT } from '@/lib/dict'
  import Reg from '@/lib/reg'
  export default {
    data() {
      return {
        // 当前增加的银行卡类型[1储蓄卡|2信用卡]
        bankcardType: 1,
        // 正面base64
        frontCardBase64: '',
        // 反面base64
        backCardBase64: '',
        // 扫描类型 [1,2] => [正面,背面]
        currentTriggerType: 0,
        // 扫描出的银行卡信息
        scanBankcardInfo: null,
        // 银行卡拓展信息
        bankcardExtraInfo: {
          bankcardCode: '',
          frontCardPath: '',
          backCardPath: ''
        },
        // 银行卡编码
        bankcardCode: '',
        // 用户信息
        userInfo: null,

        smsCode: {
          phone: '18677837372',
          value: '',
          text: '获取验证码',
          sent: false,
          disabled: false,
          resend: 10
        }
      }
    },
    methods: {
      /**
       * 绑定银行卡
       */
      bindBankcard() {
        let smsCode = this.smsCode
        let userRepayInfo = window.FJ.getStore('userRepayInfo') || {}
        let bankcardExtraInfo = this.bankcardExtraInfo
        let scanBankcardInfo = this.scanBankcardInfo
        if (bankcardExtraInfo.frontCardPath === '') {
          this.$zzz.toast.text('请扫描银行卡正面')
          return
        }
        if (bankcardExtraInfo.backCardPath === '') {
          this.$zzz.toast.text('请扫描银行卡背面')
          return
        }
        if (!smsCode.sent) {
          this.$zzz.toast.text('请先获取验证码')
          return
        }
        let codeLen = smsCode.value.trim().length
        if (codeLen < 4 || codeLen > 6) {
          this.$zzz.toast.text('请输入正确的验证码')
          return
        }
        this.$http.ykdPost(
          this.$api.saveBankcardNew,
          {
            data: {
              loanId: userRepayInfo.src_case_id || 'mall',
              bankCardNum: scanBankcardInfo.cardNumber,
              bankCardType: scanBankcardInfo.cardType,
              bankCode: bankcardExtraInfo.bankcardCode,
              bankName: scanBankcardInfo.bankName,
              bankCardImg: this.bankcardExtraInfo.frontCardPath,
              bankCardImgVerso: this.bankcardExtraInfo.backCardPath,
              mobileNum: this.smsCode.phone,
              checkCode: '',
              expiredDate: '',
              validCode: this.smsCode.value
            }
          },
          {
            toastText: '正在提交数据...'
          }
        ).then((res) => {
          console.log(res)
          if (+res.errorCode === 0) {
            this.$zzz.toast.show({
              text: '绑卡成功',
              type: 'done',
              position: 'middle',
              isShowMask: true
            })
            setTimeout(() => {
              this.$router.back()
            }, 2000)
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      /**
       * 获取短信验证码
       */
      getSmsCode() {
        let userRepayInfo = window.FJ.getStore('userRepayInfo') || {}
        let bankcardExtraInfo = this.bankcardExtraInfo
        let scanBankcardInfo = this.scanBankcardInfo
        let smsCode = this.smsCode
        if (smsCode.phone === '') {
          this.$zzz.toast.text('请输入手机号')
        }
        if (!Reg.phoneReg.test(smsCode.phone)) {
          this.$zzz.toast.text('请输入正确的手机号码')
          return
        }
        if (bankcardExtraInfo.frontCardPath === '') {
          this.$zzz.toast.text('请扫描银行卡正面')
          return
        }
        if (bankcardExtraInfo.backCardPath === '') {
          this.$zzz.toast.text('请扫描银行卡背面')
          return
        }
        // 调用获取验证码接口
        this.$http.ykdPost(
          this.$api.getBindBankcardSmsCode,
          {
            data: {
              loanId: userRepayInfo.src_case_id || 'mall',
              bankCardNum: scanBankcardInfo.cardNumber,
              bankCardType: scanBankcardInfo.cardType,
              bankCode: bankcardExtraInfo.bankcardCode,
              bankName: scanBankcardInfo.bankName,
              bankCardImg: this.bankcardExtraInfo.frontCardPath,
              bankCardImgVerso: this.bankcardExtraInfo.backCardPath,
              mobileNum: this.smsCode.phone,
              checkCode: '',
              expiredDate: '',
              validCode: this.smsCode.value
            }
          },
          {
            toastText: '正在获取验证码'
          }
        ).then((res) => {
          // console.log(res)
          if (+res.errorCode === 0) {
            this.smsCode.sent = true
            this.smsCode.disabled = true
            this.smsCode.value = ''
            this.coldDown(this.smsCode.resend)
            this.$zzz.toast.text('验证码获取成功')
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      /**
       * 倒计时短信验证码
       */
      coldDown(t) {
        if (t - 1 <= 0) {
          this.smsCode.disabled = false
          this.smsCode.text = '重新获取'
          return
        }
        this.smsCode.text = `${t - 1}s重发`
        setTimeout(() => {
          this.coldDown(t - 1)
        }, 1000)
      },
      goAddInfo() {
        this.$router.push({
          name: 'addInfo'
        })
      },
      /**
       * 图片转换成base64提交到后台识别
       */
      uploadImgToOcr(Imgcontent) {
        this.$http.ykdPost(this.$api.scanBankcardH5, {
          data: {
            base64File: Imgcontent.split(',')[1]
          }
        }).then((res) => {
          console.log(res)
          let ocrData = res.data
          if (+res.errorCode === 0) {
            let scanBankcardInfo = ocrData
            // 判断银行是否准入
            if (BANKCARDDICT.limit.indexOf(scanBankcardInfo.bankName) >= 0) {
              // 存在相似银行名称，获取银行编码
              let bankcardCode = BANKCARDDICT.code[scanBankcardInfo.bankName] || ''
              this.bankcardExtraInfo.bankcardCode = bankcardCode
              if (bankcardCode === '') {
                // 获取银行卡编码失败，不准入
                this.$zzz.toast.text('未获取到银行卡编码请更换银行卡重试')
                return
              }
            } else {
              // 不准入 提示用户重新扫描
              this.$zzz.toast.text('当前银行卡暂不支持请更换银行卡')
              return
            }
            // 银行卡准入，上传银行卡图片，上传成功继续流程，上传失败退出流程弹出错误提示
            this.$http.ykdFileUpload(Imgcontent).then((res) => {
              if (+res.errorCode === 0) {
                // 图片上传成功，继续识别成功后流程
                // 设置银行卡图片数据
                this.frontCardBase64 = Imgcontent
                this.bankcardExtraInfo.frontCardPath = res.data.path
                this.smsCode.phone = this.userInfo.phone
                this.scanBankcardInfo = scanBankcardInfo
              } else {
                this.$zzz.toast.text(res.message)
              }
            })
            // let scanBankcardInfo = res.data
            // // 判断银行是否准入
            // if (BANKCARDDICT.limit.indexOf(scanBankcardInfo.bankName) >= 0) {
            //   // 准入，获取银行编码
            //   let bankcardCode = BANKCARDDICT.code[scanBankcardInfo.bankName] || ''
            //   this.bankcardExtraInfo.bankcardCode = bankcardCode
            //   if (bankcardCode === '') {
            //     this.$zzz.toast.text('未获取到银行卡编码请更换银行卡重试')
            //     return
            //   }
            // } else {
            //   // 不准入 提示用户重新扫描
            //   this.$zzz.toast.text('当前银行卡暂不支持请更换银行卡')
            //   return
            // }
            // this.smsCode.phone = this.userInfo.phone
            // this.scanBankcardInfo = scanBankcardInfo
            // if (this.currentTriggerType === 1) {
            //   this.frontCardBase64 = Imgcontent
            // } else {
            //   this.backCardBase64 = Imgcontent
            // }
          } else {

          }
        })
      },
      /**
       * 图片上传后台不进行识别
       */
      uploadImg(Imgcontent) {
        this.$http.ykdFileUpload(Imgcontent).then((res) => {
          if (+res.errorCode === 0) {
            // 图片上传成功，继续识别成功后流程
            // 设置银行卡图片数据
            this.backCardBase64 = Imgcontent
            this.bankcardExtraInfo.backCardPath = res.data.path
          } else {
            this.$zzz.toast.text(res.message)
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
            // 上传银行卡图片识别信息

            if (vm.currentTriggerType === 1) {
              //   vm.frontCardBase64 = dataUrl
              vm.uploadImgToOcr(dataUrl)
            } else {
              vm.uploadImg(dataUrl)
              //   vm.backCardBase64 = dataUrl
            }
            vm.$refs.uploadFile.value = ''
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
    },
    created() {
      // 读取银行卡类型 默认增加储蓄卡
      this.bankcardType = this.$route.query.bankcardType || 1
      this.userInfo = window.FJ.getStore('walletUserInfo')
    }
  }
</script>
<style lang="less" scoped>
  .zz-tab__panel {
  }
  .scan-area {
    width: 7rem;
    margin: 0.2rem auto 0;
  }
  .scan-trigger-area {
    position: relative;
    height: 2rem;
    background-color: #444;
    color: #fff;
    overflow: hidden;
    .trigger-tip {
      position: absolute;
      top: 50%;
      width: 100%;
      text-align: center;
      transform: translateY(-50%);
      .ion {
        font-size: 0.5rem;
      }
    }

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
    margin-top: 0.4rem;
    .scan-result-label {
      width: 1.3rem;
      height: 0.48rem;
      line-height: 0.48rem;
      padding-right: 0.3rem;
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
      &:after {
        left: 0.3rem;
      }
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

<style lang="less">
  // 修改form样式
  .scan-result {
    .input-sms-code {
      padding: 0 0.3rem;
      &:before {
        content: " ";
        position: absolute;
        left: 0.3rem;
        top: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #d9d9d9;
        color: #d9d9d9;
      }
      .zz-form__hd {
        font-size: 0;
      }
      .zz-form-label {
        width: 1.6rem;
        height: 0.48rem;
        line-height: 0.45rem;
        padding: 0;
        padding-right: 0.3rem;
        text-align: justify !important;
        // color: #222;
        overflow: hidden;
        &:after {
          display: inline-block;
          line-height: 0.28rem;
          content: "123";
          width: 100%;
        }
      }
    }
  }
</style>

