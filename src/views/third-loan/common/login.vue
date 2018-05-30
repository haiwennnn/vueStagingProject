<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout>
          <div class="sms-code-panel"
            slot="hd">
            <p style="padding-top:.75rem;font-size: .28rem;color: #444;text-align: center;">短信验证码已发送至</p>
            <div class="phone"
              style="padding-top:.15rem;font-size: .54rem;color: #444;text-align: center;">{{smsCode.phone}}</div>
            <div class="sms-code">
              <z-form>
                <form-item label="短信验证码"
                  :labelWidth="175"
                  style="background-color:transparent;border-bottom-color:#444;">
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
          </div>
          <div class="open-wallet-service"
            :class="openWalletClassName"
            @click="openWalletService"
            slot="bd">开启钱包服务</div>
        </common-layout>
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
  export default {
    components: {
      commonLayout
    },
    data() {
      return {
        smsCode: {
          phone: '',
          value: '',
          text: '获取验证码',
          sent: false,
          disabled: false,
          resend: 15
        }
      }
    },
    computed: {
      openWalletClassName() {
        let smsCode = this.smsCode
        return {
          'disabled': !(smsCode.sent && (smsCode.value.length >= 4 && smsCode.value.length <= 6))
        }
      }
    },
    methods: {
      /**
       * 开启钱包服务
       */
      openWalletService() {
        let smsCode = this.smsCode
        if (!smsCode.sent) {
          this.$zzz.toast.text('请先获取验证码')
          return
        }
        if (smsCode.value.length < 4 && smsCode.value.length > 6) {
          this.$zzz.toast.text('验证码格式错误')
          return
        }
        if (smsCode.sent && (smsCode.value.length >= 4 && smsCode.value.length <= 6)) {
          this.$http.post(this.$api.walletLogin, {
            data: {
              mobileNum: this.smsCode.phone,
              validCode: this.smsCode.value,
              fjChnlCode: 'O695534HRuuf'
            }
          }).then((res) => {
            if (+res.errorCode === 0) {
              // 登录成功
              let userInfo = {}
              if (typeof res.data === 'string') {
                userInfo.token = res.data
                userInfo.phone = this.smsCode.phone
              } else {
                userInfo = res.data
                userInfo.phone = this.smsCode.phone
              }
              userInfo.accessToken = ''
              window.FJ.setStore('walletUserInfo', userInfo)
              this.$router.push({
                name: 'main'
              })
            } else {
              // 登录失败
              this.$zzz.toast.text(res.message)
            }
          })
        }
      },
      /**
       * 获取短信验证码
       */
      getSmsCode() {
        let smsCode = this.smsCode
        if (smsCode.phone === '') {
          this.$zzz.toast.text('请输入手机号')
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
          console.log(res)
          this.$zzz.toast.text('短信验证码发送成功')
          // 倒计时验证码时间
          this.smsCode.sent = true
          this.smsCode.disabled = true
          this.coldDown(this.smsCode.resend)
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
      }
    },
    created() {
      this.smsCode.phone = this.$route.query.phone || '13076965109'
      // TODO:增加自动获取验证码开关
      if (this.smsCode.phone) {
        // 存在手机号自动调用获取验证码接口
        // this.getSmsCode()
      }
    }
  }
</script>
<style lang="less" scoped>
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
</style>


