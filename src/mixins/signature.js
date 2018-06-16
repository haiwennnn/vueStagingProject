export default {
  data() {
    return {
    }
  },
  methods: {
    /**
     * 在非h5钱包中签字
     * 此接口部署在云科贷中，目测卡牛、返利网都会调用此接口回调中应该会进行一个重定向
     */
    signInThirdLoan(signData, signPath, callback) {
      let signApiUrl = this.$api.signature
      this.$http.ykdPost(
        signApiUrl,
        {
          data: {
            pictureBase64: signData.split(',')[1],
            trajectoryData: signPath.toString()
          }
        },
        {
          toastText: '正在校验签名',
          direction: '90'
        }
      ).then((res) => {
        if (+res.errorCode === 0) {
          this.$zzz.toast.text('恭喜完成签名认证', '', '90')
          callback && callback()
        } else {
          this.$zzz.toast.text(res.message, '', '90')
        }
      })
    },
    /**
     * 在h5钱包中签名
     */
    signInH5Wallet(signData, signPath, callback) {
      let signApiUrl = this.$api.walletSignature
      this.$http.post(
        signApiUrl,
        {
          data: {
            pictureBase64: signData.split(',')[1],
            trajectoryData: signPath.toString()
          }
        },
        {
          toastText: '正在校验签名',
          direction: '90'
        }
      ).then((res) => {
        if (+res.errorCode === 0) {
          this.$zzz.toast.text('恭喜完成签名认证', '', '90')
          callback && callback()
        } else {
          this.$zzz.toast.text(res.message, '', '90')
        }
      })
    }
  }
}
