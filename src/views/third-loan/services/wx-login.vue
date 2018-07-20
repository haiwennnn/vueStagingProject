<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <div class="zz-tab__panel">
        <div class="wx-bind-panel"
          v-if="checkWxOpenIdStatus">
          <div class="wx-bind-head">
            <img src="../../../assets/wx-login/wx-login-logo.png"
              alt="">
            <span>云科贷</span>
          </div>
          <div class="wx-bind-user-info">
            <z-form ref="bindwx"
              :rules="ruleValidate"
              v-model="userInfo"
              :no-top-line="true">
              <form-input label="手机号"
                placeholder="输入您的手机号码"
                :clear-all-btn="true"
                value-text-align="left"
                prop="phone"
                v-model="smsCode.phone"></form-input>
            </z-form>
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
          <div class="wx-bind-btn">
            <z-button type="primary"
              @click="bindWx">确认绑定</z-button>
          </div>
        </div>
      </div>
    </div>
    <z-dialog v-model="noRegisterPopup">
      <div class="user-no-register">
        <div class="zz-dialog__bd">
          <div style="text-align:center;">
            <img style="width:50%;"
              src="../../../assets/wx-login/h5downloadapp.png">
            <img style="width:50%;margin-top:.3rem;"
              src="../../../assets/wx-login/h5downloadappbtn.png"
              @click="downloadApp">
            <p>您还不是云科贷用户，赶紧去下载App吧</p>
          </div>
        </div>
      </div>
    </z-dialog>
  </div>
</template>
<script>
  /**
   * 登录页面
   * TODO:未传手机号码的情况
   */
  import commonLayout from '../components/commonLayout'
  import Reg from '@/lib/reg'
  import smsCodeMixins from '@/mixins/smsCode.js'
  export default {
    components: {
      commonLayout
    },
    mixins: [smsCodeMixins],
    data() {
      return {
        // 是否check openid状态
        checkWxOpenIdStatus: false,
        // 未注册遮罩层
        noRegisterPopup: false,
        openId: '',
        userInfo: {
          phone: '',
          userName: ''
        },
        ruleValidate: {
          phone: [
            { type: 'string', message: '请输入正确的手机号', required: false, pattern: Reg.phoneReg }
          ]
        },
        type: ''
      }
    },
    computed: {
      openWalletClassName() {
        let smsCode = this.smsCode
        return {
          'disabled': !(smsCode.sent && (smsCode.value.length >= 4 && smsCode.value.length <= 6))
        }
      },
      /**
       * 头部是否存在返回状态
       */
      headerHasBackStatus() {
        if (this.type) {
          return false
        }
        return true
      }
    },
    methods: {
      downloadApp: function () {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        let isWeXin = /MicroMessenger/i.test(u)
        console.log(u)
        console.log(isWeXin)
        if (isWeXin) {
          this.noRegisterPopup = false
          location.href = 'http://wxz.myapp.com/16891/B58153DB95BD03257B745C91A7655150.apk?fsname=com.chinacreditech.client_1.3.33_37.apk'
          return
        }
        if (isAndroid) {
          this.noRegisterPopup = false
          location.href = 'http://app.chinacreditech.com/app/download/YunKeDai.apk'
          return
        }
        if (isiOS) {
          this.noRegisterPopup = false
          location.href = 'https://itunes.apple.com/us/app/id1230004311?l=zh&ls=1&mt=8'
        }
      },
      bindWx() {
        if (this.checkSmsPhone() && this.checkSmsCode()) {
          this.bindWxOpenId()
        }
      },
      openRepayService() {

      },
      /**
       * 根据云科贷token查询用户信息
       */
      findUserYkdIdInfo() {
        this.$http.ykdPost(this.$api.getUserInfo).then((res) => {
          if (+res.errorCode === 0) {
            let userInfo = window.FJ.getStore('walletUserInfo') || {}
            let realInfo = res.data.realNameAuthentication
            if (realInfo) {
              // 存一个身份证号
              userInfo.idNo = realInfo.identityCardNo
              // 存用户姓名
              userInfo.userName = realInfo.realName
            }
            // 存一个时间戳
            userInfo.ts = new Date().getTime()
            window.FJ.setStore('walletUserInfo', userInfo)
            this.getWalletLoanInfo()
          } else {
            this.$zzz.toast.text('读取用户基本信息失败')
          }
        }, (e) => {
          this.$zzz.toast.text('读取用户基本信息失败')
        })
      },
      /**
       * 获取短信验证码
       */
      getSmsCode() {
        // let smsCode = this.smsCode
        if (this.smsCode.disabled) {
          // 当前验证码无法调用(已经获取)
          return false
        }
        if (!this.checkSmsPhone()) {
          return
        }
        // if (!Reg.phoneReg.test(smsCode.phone)) {
        //   this.$zzz.toast.text('请输入正确的手机号码')
        //   return
        // }
        this.$zzz.toast.show({
          text: '正在获取验证码',
          type: 'loading',
          position: 'middle',
          time: 0,
          isShowMask: true
        })
        // 调用获取验证码接口
        this.$http.post(this.$api.getSmsCode, {
          data: {
            mobileNo: this.smsCode.phone
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            this.$zzz.toast.text('短信验证码发送成功')
            // 倒计时验证码时间
            this.smsCode.sent = true
            this.smsCode.disabled = true
            this.coldDown(this.smsCode.resend)
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
      /**
       * 校验openId是否绑定
       */
      checkOpenId() {
        this.$http.ykdPost(
          this.$api.wxCheckBind,
          {
            data: {
              openId: this.openId
            }
          },
          {
            toastText: '正在校验信息'
          }
        ).then((res) => {
          let errorCode = res.errorCode
          if (errorCode === '-10017') {
            // 未绑定，进行绑定
            this.checkWxOpenIdStatus = true
            this.$zzz.toast.text('请进行账户绑定')
            return
          }
          if (errorCode === '-10015') {
            // 已绑定，跳转到还款页面
            // this.checkWxOpenIdStatus = true
            this.$router.replace({
              name: 'thirdRepayEnter',
              query: {
                token: res.data.token,
                fintechUmuserId: res.data.idFintechUm
              }
            })
            return
          }
          this.$zzz.toast.text(res.message)
        })
      },
      bindWxOpenId() {
        this.$http.ykdPost(
          this.$api.wxBind,
          {
            data: {
              openId: this.openId,
              mobileNum: this.smsCode.phone,
              validCode: this.smsCode.value
            }
          },
          {
            toastText: '正在绑定账号'
          }
        ).then((res) => {
          if (res.errorCode === '-10014') {
            this.noRegisterPopup = true
            return
          }
          if (res.errorCode === '10000') {
            // 绑定成功跳转到还款页面
            this.$zzz.toast.text('恭喜绑定成功')
            setTimeout(() => {
              // this.$router.replace({
              //   name: 'thirdRepayEnter',
              //   query: {
              //     token: res.data.token,
              //     fintechUmuserId: res.data.idFintechUm
              //   }
              // })
              this.checkOpenId()
            }, 1000)
            return
          }
          if (res.errorCode === '-10015') {
            // this.noRegisterPopup = true
            this.$zzz.toast.text('该手机号已绑定过另一个微信号')
            return
          }
          this.$zzz.toast.text(res.message)
        })
      }
    },
    created() {
      console.log(location.href)
      // 校验openId是否绑定
      this.openId = this.$route.query.opid || ''
      this.checkOpenId()
    }
  }
</script>
<style lang="less" scoped>
  .zz-tab__panel {
    background-color: #fff;
  }
  .wx-bind-head {
    padding-top: 1rem;
    text-align: center;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin: 0 auto;
      border-radius: 50%;
    }
    span {
      display: block;
      line-height: 1;
      margin-top: 0.2rem;
      font-size: 0.32rem;
    }
  }
  .user-no-register {
    p {
      line-height: 0.44rem;
      text-align: center;
      text-indent: 0;
      color: #222;
    }
  }
  .wx-bind-user-info {
    margin-top: 0.6rem;
    padding: 0 0.6rem;
  }
  .wx-bind-btn {
    margin: 0.6rem 0.6rem 0;
  }
  .sms-code {
    width: 6.9rem;
    margin: 0.6rem auto 0;
  }
  .sms-code-btn {
    width: 2rem;
    line-height: 0.6rem;
    border-left: 1px solid #444;
    font-size: 0.28rem;
    text-align: center;
  }
  .open-wallet-service {
    width: 2.6rem;
    height: 0.96rem;
    line-height: 0.96rem;
    margin: 2rem auto 0;
    color: #444;
    font-size: 0.32rem;
    text-align: center;
    background-color: #f9ca1a;
    &.disabled {
      opacity: 0.5;
    }
  }
  .zz-cell:after {
    // border-bottom-color: #444;
  }
  .zz-cells {
    &:before {
      display: none;
    }
    .zz-cell {
      padding: 0.15rem 0rem;
      &:last-child {
        &:after {
          display: block;
        }
      }
    }
  }
</style>


