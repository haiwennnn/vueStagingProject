<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header :has-back="headerHasBackStatus">信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout>
          <div class="sms-code-panel"
            slot="hd">
            <p style="padding-top:.75rem;font-size: .28rem;color: #444;text-align: center;">短信验证码已发送至</p>
            <div class="phone"
              style="padding-top:.15rem;font-size: .54rem;color: #444;text-align: center;">{{smsCode.phone}}</div>
            <div class="sms-code">
              <z-form style="background-color: transparent;"
                :no-top-line="true">
                <form-item label="短信验证码"
                  :labelWidth="175">
                  <input type="text"
                    class="zz-input"
                    placeholder="请输入验证码"
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
      finishLogin() {
        if (this.type === 'relogin') {
          this.$router.back()
        } else {
          this.$router.replace({
            name: 'main'
          })
        }
      },
      /**
       * 获取钱包贷款信息
       */
      getWalletLoanInfo() {
        this.$http.post(this.$api.getWalletLoanInfo).then((res) => {
          if (+res.errorCode === 0) {
            let walletLoanInfo = res.data
            window.FJ.setStore('walletLoanInfo', walletLoanInfo)
            this.finishLogin()
          } else {
            // this.$zzz.toast.text(res.message)
            this.finishLogin()
          }
        })
      },
      /**
       * 根据云科贷token查询用户信息
       */
      findUserYkdIdInfo() {
        this.$http.ykdPost(this.$api.getUserInfo).then((res) => {
          if (+res.errorCode === 0) {
            let userInfo = window.FJ.getStore('walletUserInfo')
            let realInfo = res.data.realNameAuthentication
            // 存一个身份证号
            userInfo.idNo = realInfo.identityCardNo
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
       * 根据手机号获取云科贷token,id
       */
      findUserYkdInfo() {
        this.$http.post(
          this.$api.getYkdData,
          {
            data: {
              mobileNum: this.smsCode.phone
            }
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            let walletUserInfo = window.FJ.getStore('walletUserInfo')
            walletUserInfo.accessToken = res.data.token
            walletUserInfo.idFintechUmUser = res.data.fintechUmuserId
            window.FJ.setStore('walletUserInfo', walletUserInfo)
            this.findUserYkdIdInfo()
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
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
              this.findUserYkdInfo()
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
      },
      /**
       * 完成本地校验
       */
      completeLocalCheck() {
        this.smsCode.phone = this.$route.query.phone || '13076965109'
        // TODO:增加自动获取验证码开关
        if (this.smsCode.phone) {
          // 存在手机号自动调用获取验证码接口
          // this.getSmsCode()
        }
      }
    },
    created() {
      // 读取本地登录信息判断是否包含已经登录的信息
      this.type = this.$route.query.type || ''
      let walletUserInfo = window.FJ.getStore('walletUserInfo')
      if (!walletUserInfo) {
        // 不存在本地用户信息
        this.completeLocalCheck()
      } else {
        // 调用接口判断当前本地信息是否过期
        let nowTs = new Date().getTime()
        let timeDiff = nowTs - (walletUserInfo.ts || nowTs)
        if (timeDiff > 60 * 60 * 1000) {
          // 时间超过1小时，登录状态失效
          this.completeLocalCheck()
          return
        }
        this.$router.replace({
          name: 'main'
        })
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
  .zz-cell:after {
    border-bottom-color: #444;
  }
</style>


