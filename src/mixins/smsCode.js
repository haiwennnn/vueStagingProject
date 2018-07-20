import Reg from '@/lib/reg'
export default {
  data() {
    return {
      smsCode: {
        phone: '',
        value: '',
        text: '获取验证码',
        sent: false,
        disabled: false,
        resend: 60
      }
    }
  },
  methods: {
    setSmsCodePhone(phone) {
      phone = phone || ''
      this.smsCode.phone = phone
    },
    checkSmsPhone() {
      let smsCode = this.smsCode
      if (smsCode.phone === '') {
        this.$zzz.toast.text('请输入手机号')
        return false
      }
      if (!Reg.phoneReg.test(smsCode.phone)) {
        this.$zzz.toast.text('请输入正确的手机号')
        return false
      }
      return true
    },
    checkSmsCode() {
      let smsCode = this.smsCode
      if (!smsCode.sent) {
        this.$zzz.toast.text('请先获取验证码')
        return false
      }
      let codeLen = smsCode.value.trim().length
      if (codeLen < 4 || codeLen > 6) {
        this.$zzz.toast.text('请输入正确的验证码')
        return false
      }
      return true
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
     * 重置验证码状态
     */
    resetSmsCodeStatus() {
    }
  }
}
