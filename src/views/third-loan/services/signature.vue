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
        console.log(signInfo)
        this.signInThirdLoan(signInfo.signImg, signInfo.signTrack, () => {
          location.href = decodeURIComponent(this.redirectUrl)
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


