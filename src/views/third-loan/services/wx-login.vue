<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <div class="zz-tab__panel">
        <div class="wx-bind-panel">
          <div class="wx-bind-head">
            <img src="http://thirdwx.qlogo.cn/mmopen/bxltCGBE4XBCicgXRjUlXHEkOQ4zhiaR6szvDQ4TG2dwuSVoQZmvvEu56QU49SyJv3IRqh2ibvYDJ2CaEpibIsuhhUMVGibDrRTxp/132"
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
            <z-button @click="bindWx">确认绑定</z-button>
          </div>
        </div>
      </div>
    </div>
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
      bindWx() {
        if (this.checkSmsPhone() && this.checkSmsCode()) {
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
        let smsCode = this.smsCode
        if (smsCode.phone === '') {
          this.$zzz.toast.text('请输入手机号')
          return
        }
        if (!Reg.phoneReg.test(smsCode.phone)) {
          this.$zzz.toast.text('请输入正确的手机号码')
          return
        }
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
      }
    },
    created() {
      // 校验openId是否绑定
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


