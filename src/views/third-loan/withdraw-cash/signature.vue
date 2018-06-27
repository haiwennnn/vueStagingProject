<template>
  <div>
    <signature-pad @on-sign-complete="signComplete"></signature-pad>
  </div>
</template>
<script>
  /**
   * 提现流程签名
   */
  import signaturePad from '../components/signature'
  import signatureMixins from '@/mixins/signature'
  import reBindbankcardMixins from '@/mixins/reBindbankcard'
  export default {
    components: {
      signaturePad
    },
    mixins: [signatureMixins, reBindbankcardMixins],
    data() {
      return {}
    },
    methods: {
      signComplete(signInfo) {
        console.log(signInfo)
        this.signInH5Wallet(signInfo.signImg, signInfo.signTrack, () => {
          this.findSignatureStatus()
        })
      },
      /**
       * 查询签名结果
       */
      findSignatureStatus() {
        this.$http.post(this.$api.findSignatureStatus).then((res) => {
          if (+res.errorCode === 0) {
            // 签名成功，进行人脸识别
            this.$router.replace({
              name: 'faceIdentify'
            })
          } else {
            this.$zzz.toast.text(res.message)
          }
        })
      }
    },
    created() {
      this.reBindBankcardType = 'wallet'
      this.checkNeedReBindBankcard(this.reBindBankcardType)
    }
  }
</script>
<style lang="less" scoped>
</style>


