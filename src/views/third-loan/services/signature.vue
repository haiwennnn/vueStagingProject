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
      }
    },
    methods: {
      /**
       * 签名确认回调
       */
      signComplete(signInfo) {
        this.signInThirdLoan(signInfo.signImg, signInfo.signTrack, () => {
          let walletThirdLoanServicesEnterInfo = window.FJ.getStore('walletThirdLoanServicesEnterInfo')
          this.$http.ykdGet(
            this.$api.signSuccessCall + walletThirdLoanServicesEnterInfo.orderNo
          ).then((res) => {
            this.$zzz.toast.text('签字成功')
            setTimeout(() => {
              if (walletThirdLoanServicesEnterInfo.scurl) {
                // 签名成功后进行判断是否需要重定向

                // 返利网重定向的特殊处理
                // if (walletThirdLoanServicesEnterInfo.channelCode === 'FanLi') {
                //   let urls = walletThirdLoanServicesEnterInfo.scurl.split('target')
                //   let url = decodeURIComponent(urls[0]) + 'target' + urls[1]
                //   location.href = url
                // } else {
                //   console.log(walletThirdLoanServicesEnterInfo.scurl)
                // 其他情况只做decode解码
                location.href = decodeURIComponent(walletThirdLoanServicesEnterInfo.scurl)
                // }
              } else {
                // 不需要重定向 增加重定向到自己的成功页面
              }
            }, 1000)
          })
        })
      }
    },
    created() {
      let walletThirdLoanServicesEnterInfo = window.FJ.getStore('walletThirdLoanServicesEnterInfo')
      if (walletThirdLoanServicesEnterInfo.bcardv === 't') {
        this.checkNeedReBindBankcard('unWallet')
      }
    }
  }
</script>
<style lang="less" scoped>
</style>


