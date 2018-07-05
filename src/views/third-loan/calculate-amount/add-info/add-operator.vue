<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>运营商认证</z-header>
      <div class="zz-tab__panel">
        <div class="user-operator-panel">
          <div class="user-operator-phone">
            手机号: {{phone}}
          </div>
          <z-form>
            <form-item label="服务密码"
              style="padding:.1rem .3rem">
              <z-input type="password"
                v-model.trim="serviceCode"
                :placeholder="'请输入服务密码'"></z-input>
            </form-item>
            <form-item label="短信验证码"
              v-if="hasSmsCode && !hasImgCode"
              style="padding:.1rem .3rem">
              <z-input v-model.trim="smsCode"
                :placeholder="'请输入短信验证码'"></z-input>
            </form-item>
            <form-item label="图形验证码"
              v-if="hasImgCode"
              style="padding:.1rem .3rem">
              <z-input v-model.trim="imgCode"
                :placeholder="'请输入图形验证码'"></z-input>
              <div slot="ft">
                <div>
                  <img style="height:100%;width:auto;vertical-align: middle;"
                    :src="imgCodeSrc"
                    alt="">
                </div>
              </div>
            </form-item>
          </z-form>
          <p class="descript"
            style="padding-left:.3rem;">* 手机运营商认证能使你更快通过审核</p>
        </div>
        <div class="next-btn">
          <z-button type="primary"
            @click="applyAuth">{{btnText}}</z-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 手机运营商认证能使你更快通过审核。首先，需要先验证你的手机号码。 -->
</template>
<script>
  /**
   * 个人信息完善
   *   |-增加运营商认证
   */
  export default {
    data() {
      return {
        hasSmsCode: false,
        // 短信验证码taksId
        taskId: '',
        hasImgCode: false,
        serviceCode: '',
        smsCode: '',
        imgCode: '',
        imgCodeSrc: '',
        btnText: '下一步',
        phone: window.FJ.getStore('walletUserInfo').phone
      }
    },
    methods: {
      /**
       * 提交运营商认证申请
       */
      applyAuth() {
        if (this.hasSmsCode && this.hasImgCode) {
          if (!this.imgCode) {
            this.$zzz.toast.text('请输入图形验证码')
            return
          }
          this.walletMoxieSMS(this.imgCode)
        } else if (this.hasSmsCode) {
          if (!this.smsCode) {
            this.$zzz.toast.text('请输入短信验证码')
            return
          }
          this.walletMoxieSMS(this.smsCode)
        } else if (this.hasImgCode) {
          if (!this.imgCode) {
            this.$zzz.toast.text('请输入图形验证码')
            return
          }
          this.walletMoxieSMS(this.imgCode)
        } else {
          if (this.serviceCode.length < 6) {
            this.$zzz.toast.text('服务密码长度错误')
            return
          }
          this.walletMoxie()
        }
      },
      /**
       * 再次发起魔蝎认证，需要输入验证码任务id
       */
      walletMoxieSMS(code) {
        this.$http.post(
          this.$api.walletMoxieSMS,
          {
            data: {
              verifyCode: code,
              taskId: this.taskId,
              type: '2'
            },
            timeout: 60000
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            this.$zzz.toast.text('恭喜完成运营商认证')
            this.$router.back()
          } else if (+res.errorCode === 1) {
            this.hasSmsCode = true
            this.hasImgCode = false
            this.smsCode = ''
            this.imgCode = ''
            this.taskId = res.data.taskId
            this.btnText = '校验验证码'
          } else if (+res.errorCode === 1) {
            this.hasImgCode = true
            this.smsCode = ''
            this.imgCode = ''
            this.imgCodeSrc = res.data.base64Img
            this.btnText = '校验验证码'
          } else {

          }
        })
      },
      /**
       *  发起钱包魔蝎认证传递服务密码
       */
      walletMoxie() {
        this.$http.post(
          this.$api.walletMoxie,
          {
            data: {
              password: this.serviceCode
            },
            timeout: 60000
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            this.$zzz.toast.text('恭喜完成运营商认证')
            this.$router.back()
          } else if (+res.errorCode === 1) {
            this.hasSmsCode = true
            this.hasImgCode = false
            this.smsCode = ''
            this.imgCode = ''
            this.taskId = res.data.taskId
            this.btnText = '校验验证码'
          } else if (+res.errorCode === 2) {
            this.hasImgCode = true
            this.smsCode = ''
            this.imgCode = ''
            this.imgCodeSrc = res.data.base64Img
            this.btnText = '校验验证码'
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .user-operator-phone {
    padding: 0.3rem 0.3rem 0.1rem 0.3rem;
    font-size: 0.28rem;
    color: #999;
  }
  .next-btn {
    margin: 0.6rem 0.3rem 0;
  }
</style>

