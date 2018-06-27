export default {
  data() {
    return {
      // 页面加载状态
      // 签名页面需要查询是否需要重新绑定银行卡
      reBindBankcardPageStatus: false,
      // 校验类型 [kaniu,wallet]
      reBindBankcardType: 'wallet'
    }
  },
  methods: {
    checkNeedReBindBankcard(type) {
      this.$http.ykdPost(this.$api.checkNeedReBindBankcard + type).then((res) => {
        if (+res.errorCode === 0) {
          if (+res.data.isNeedAgainBindCard !== 1) {
            // 不需要进行银行卡绑定
            this.reBindBankcardPageStatus = true
          } else {
            // 保存重新认证的银行卡信息
            // 判断查询类型，读取不同的数据源
            let walletReBindBankcardInfo
            window.FJ.removeStore('walletReBindBankcardInfo')
            if (type === 'wallet') {
              let walletLoanInfo = window.FJ.getStore('walletLoanInfo')
              walletReBindBankcardInfo = {
                bankCardNo: walletLoanInfo.receiveAcct,
                loanId: walletLoanInfo.loanId
              }
            } else {
              walletReBindBankcardInfo = {
                bankCardNo: res.data.bankCardNo,
                loanId: res.data.loanId
              }
            }

            window.FJ.setStore('walletReBindBankcardInfo', walletReBindBankcardInfo)

            this.$zzz.alert.show({
              content: '您的银行卡需要重新认证',
              buttonText: '去认证',
              onHide: () => {
                this.$router.push({
                  name: 'rebindBankcard'
                })
              }
            })
          }
        } else {
          // 查询出错提示错误信息，返回上一页
          this.$zzz.alert.show({
            content: res.message,
            onHide: () => {
              this.$router.back()
            }
          })
        }
      })
    }
  },
  created() {
    // this.reBindBankcardType = this.$route.query.origin || 'kaniu'
    // this.checkNeedReBindBankcard()
  }
}
