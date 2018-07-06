<template>
  <div>
    <signature-pad :hide-back="true"
      @on-sign-complete="signComplete"></signature-pad>
  </div>
</template>
<script>
  import signaturePad from '@/views/third-loan/components/signature'
  import signatureMixins from '@/mixins/signature'
  import reBindbankcardMixins from '@/mixins/reBindbankcard'
  export default {
    components: {
      signaturePad
    },
    mixins: [signatureMixins, reBindbankcardMixins],
    data() {
      return {
        redirectUrl: ''
      }
    },
    methods: {
      /**
       * 签名确认回调
       */
      signComplete(signInfo) {
        this.signInThirdLoan(signInfo.signImg, signInfo.signTrack, () => {
          let walletUserInfo = window.FJ.getStore('walletUserInfo')
          this.$http.ykdGet(
            this.$api.signSuccessCall + walletUserInfo.orderNo
          ).then((res) => {
            this.$zzz.toast.text('签字成功')
            setTimeout(() => {
              // 返利网重定向的特殊处理
              let urls = this.redirectUrl.split('target')
              let url = decodeURIComponent(urls[0]) + 'target' + urls[1]
              location.href = decodeURIComponent(url)
              // location.href = decodeURIComponent(this.redirectUrl)
              // if (+res.errorCode === 0) {

              // } else {
              //   location.href = decodeURIComponent(this.redirectUrl)
              // }
            }, 1000)
          })
        })
      }
    },
    created() {
      this.redirectUrl = this.$route.query.redirect || ''
      this.reBindBankcardType = 'kaniu'
      this.checkNeedReBindBankcard(this.reBindBankcardType)
    }
  }
</script>
<style lang="less" scoped>
</style>


