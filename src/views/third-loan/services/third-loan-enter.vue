<template>
  <div class="zz-page-body signature-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>第三方入口</z-header>
        <div class="zz-tab__panel zz-tab__panel_hastabbar"></div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 第三方贷款入口页面
   * @query {String} hide-header 是否隐藏头部
   */
  export default {
    data() {
      return {
        orderNo: '',
        rurl: '',
        channelCode: '',
        needShowContractMap: {
          'FanLi': 1
        },
        // 第三方进入参数
        thirdLoanEnterArgs: {
          // 订单号
          orderNo: '',
          // 渠道编码
          channelCode: '',
          // 成功回调
          scurl: '',
          // 失败回调
          fcurl: '',
          // 是否展示合同
          view: '',
          // 是否签名
          autograph: '',
          // 是否扣保险费
          policy: '',
          // 是否重新认证银行卡
          bcardv: ''
        }
      }
    },
    methods: {
      // 锁定下拉刷新， in kaniu
      lockDownRefreshInKaniu() {
        var bol = false
        // 设置卡牛不允许下拉刷新
        const call = (uri) => {
          console.log(uri)
          let iframe = document.createElement('iframe')
          iframe.setAttribute('src', uri)
          document.body.appendChild(iframe)
          iframe.parentNode.removeChild(iframe)
          iframe = null
        }
        call(`cardniu://app/webview/config?isCanPullRefresh=${bol}`)
      },
      // 初始化用户登录信息
      initUserInfo() {
        let query = this.$route.query
        let thirdLoanEnterArgs = {
          // 订单号
          orderNo: query['order_no'] || '',
          // 渠道编码
          channelCode: query['channel_code'] || '',
          // 成功回调
          scurl: query['scurl'] || '',
          // 失败回调
          fcurl: query['fcurl'] || '',
          // 是否展示合同
          view: query['view'] || 'f',
          // 是否签名
          autograph: query['autograph'] || 'f',
          // 是否扣保险费
          policy: query['policy'] || 'f',
          // 是否重新认证银行卡
          bcardv: query['bcardv'] || 'f'
        }
        this.thirdLoanEnterArgs = thirdLoanEnterArgs
        if (!thirdLoanEnterArgs.orderNo) {
          this.$zzz.alert.show({
            content: '用户信息缺失'
          })
          return
        }
        this.$http.ykdPost(
          this.$api.getUserLoginInfo + this.thirdLoanEnterArgs.orderNo,
          {
            data: {
              ssjLoanId: this.thirdLoanEnterArgs.orderNo
            }
          },
          {
            toastText: '正在获取用户信息'
          }
        ).then((res) => {
          if (+res.errorCode === 0) {
            let data = res.data
            window.FJ.setStore('walletUserInfo', {
              accessToken: data.accessToken,
              idFintechUmUser: data.idFintechUmUser,
              phone: '',
              token: '',
              userName: ''
            })
            // 写入第三方贷款服务数据
            window.FJ.setStore('walletThirdLoanServicesEnterInfo', this.thirdLoanEnterArgs)
            setTimeout(() => {
              this.$zzz.toast.hide()
              // 判断是否需要展示协议列表
              if (this.thirdLoanEnterArgs.view === 't') {
                this.$router.replace({
                  name: 'protocol',
                  query: {
                    srurl: this.thirdLoanEnterArgs.srurl,
                    frurl: this.thirdLoanEnterArgs.frurl
                  }
                })
              } else {
                this.$router.replace({
                  name: 'signature',
                  query: {
                    srurl: this.thirdLoanEnterArgs.srurl,
                    frurl: this.thirdLoanEnterArgs.frurl
                  }
                })
              }
            }, 1000)
          } else {
            this.$zzz.toast.text('获取用户信息失败', '')
          }
        })
      }
    },
    created() {
      this.initUserInfo()
    },
    mounted() {
      // document.getElementsByTagName('title')[0].innerText = '第三方入口'
      // 锁定下拉刷新 in kaniu
      this.lockDownRefreshInKaniu()
      this.$nextTick(() => {
        document.getElementById('app').setAttribute('class', 'hide-header')
      })
    }
  }
</script>
<style lang="less" scoped>
</style>
