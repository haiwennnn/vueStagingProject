<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>银行卡认证</z-header>
      <div class="zz-tab__panel">
        <div class="rebind-bankcard">
          <p style="padding:.8rem 0;font-size:.4rem;text-align:center;">您的银行卡需要重新认证！</p>
          <div class="bankcard-info">
            <cells>
              <cell :noBottomLine="true">
                <p style="width:1.4rem;padding-right:.25rem;"
                  slot="hd">银行卡号</p>
                <p slot="bd">{{bankcardInfo.bankName}}({{bankcardInfo.bankCardNo | bankcard4No}})</p>
              </cell>
              <cell :noBottomLine="true">
                <p style="width:1.4rem;padding-right:.25rem;"
                  slot="hd">本人姓名</p>
                <p slot="bd">{{userInfo.username}}</p>
              </cell>
              <!-- <cell :noBottomLine="true">
                <p style="width:1.4rem;padding-right:.25rem;"
                  slot="hd">手机号码</p>
                <p slot="bd">{{userInfo.phone}}</p>
              </cell> -->
            </cells>
            <z-form ref="reBindBankcardPhone"
              :rules="ruleValidate"
              v-model="userInfo"
              :no-top-line="true">
              <form-input label="手机号码"
                :clear-all-btn="true"
                value-text-align="left"
                prop="phone"
                v-model="userInfo.phone"></form-input>
            </z-form>
            <br />
            <z-form>
              <form-item class="input-sms-code"
                label="验证码"
                :labelWidth="165">
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
          <div class="confirm-btn">
            <z-button type="primary"
              style="background: #fc834e;"
              @click="bindBankcard">确定</z-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import smsCodeMixins from '@/mixins/smsCode.js'
  import bankcardMixins from '@/mixins/bankcard.js'
  import Reg from '@/lib/reg'
  export default {
    mixins: [smsCodeMixins, bankcardMixins],
    data() {
      return {
        reBindBankcardInfo: {
          loanId: '',
          receiveAcct: ''
        },
        bankcardInfo: {
          bankName: '',
          bankCardNo: '',
          bankCardType: '',
          bankCode: ''
        },
        userInfo: {
          phone: '',
          userName: ''
        },
        // 用户获取验证码手机号
        userGetSmsCodePhone: '',
        ruleValidate: {
          phone: [
            { type: 'string', message: '请输入正确的手机号', required: true, pattern: Reg.phoneReg }
          ]
        }
      }
    },
    methods: {
      /**
       * 提交数据前置校验
       */
      submitCheck() {
        let reBindBankcardPhone = this.$refs.reBindBankcardPhone
        let reBindBankcardPhoneStatus = false
        reBindBankcardPhone.validate((d) => {
          if (d) {
            reBindBankcardPhoneStatus = true
          } else {
            this.$zzz.toast.text('请输入正确的手机号')
          }
        })
        return reBindBankcardPhoneStatus
      },
      getSmsCode() {
        if (this.submitCheck() && this.checkSmsPhone()) {
          this.getBindBankcardSmsCode()
        }
      },
      getBindBankcardSmsCode() {
        // 调用获取验证码接口
        this.$http.ykdPost(
          this.$api.getBindBankcardSmsCode,
          {
            data: {
              loanId: this.reBindBankcardInfo.loanId || '',
              bankCardNum: this.bankcardInfo.bankCardNo || '',
              bankCardType: this.bankcardInfo.bankCardType || '',
              bankName: this.bankcardInfo.bankName || '',
              mobileNum: this.userInfo.phone
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
            // 保存用户成功获取验证码的手机号
            this.userGetSmsCodePhone = this.userInfo.phone
            this.$zzz.toast.text('验证码获取成功')
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      },
      bindBankcard() {
        if (this.checkSmsCode()) {
          this.$http.ykdPost(
            this.$api.saveBankcardNew,
            {
              data: {
                loanId: this.reBindBankcardInfo.loanId || '',
                bankCardNum: this.bankcardInfo.bankCardNo || '',
                bankCardType: this.bankcardInfo.bankCardType || '',
                bankName: this.bankcardInfo.bankName || '',
                mobileNum: this.userGetSmsCodePhone,
                bankCardImg: '',
                bankCardImgVerso: '',
                checkCode: '',
                expiredDate: '',
                bankCode: this.bankcardInfo.bankCode,
                validCode: this.smsCode.value
              }
            },
            {
              toastText: '正在提交数据...'
            }
          ).then((res) => {
            if (+res.errorCode === 0) {
              this.$zzz.toast.show({
                text: '银行卡认证成功',
                type: 'done',
                position: 'middle',
                isShowMask: true
              })
              window.FJ.removeStore('walletReBindBankcardInfo')
              setTimeout(() => {
                this.$router.back()
              }, 1500)
            } else {
              this.$zzz.toast.text(res.message)
            }
          })
        }
      },
      /**
       * 根据云科贷token查询用户信息
       */
      findUserYkdIdInfo() {
        this.$http.ykdPost(this.$api.getUserInfo).then((res) => {
          if (+res.errorCode === 0) {
            let userInfo = window.FJ.getStore('walletUserInfo')
            let realInfo = res.data.realNameAuthentication
            let userData = res.data.user
            // 存一个身份证号
            userInfo.idNo = realInfo.identityCardNo
            userInfo.phone = userData.mobileNo
            userInfo.username = userData.realName
            // 存一个时间戳
            userInfo.ts = new Date().getTime()
            window.FJ.setStore('walletUserInfo', userInfo)
            // this.$set(this, 'userInfo', userInfo)
            this.userInfo = JSON.parse(JSON.stringify(userInfo))
            this.setSmsCodePhone(userInfo.phone)
          } else {
            this.$zzz.toast.text('读取用户基本信息失败')
          }
        }, (e) => {
          this.$zzz.toast.text('读取用户基本信息失败')
        })
      }
    },
    created() {
      this.reBindBankcardInfo = window.FJ.getStore('walletReBindBankcardInfo')
      // 查询云科贷用户信息
      this.findUserYkdIdInfo()
      this.getBankcardList({
        loanId: this.reBindBankcardInfo.loanId
      }).then((res) => {
        if (+res.errorCode === 0) {
          let bankcardInfo
          res.data.forEach((item, index) => {
            if (item.bankCardNo === this.reBindBankcardInfo.bankCardNo) {
              bankcardInfo = item
            }
          })
          if (bankcardInfo) {
            this.bankcardInfo = bankcardInfo
          }
        } else {
          this.$zzz.toast.text(res.message)
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .bankcard-info {
    margin: 0.4rem;
  }
  .confirm-btn {
    margin: 0.4rem;
  }
</style>


