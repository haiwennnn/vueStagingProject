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
        ssjLoanId: '',
        rurl: ''
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
        this.ssjLoanId = this.$route.query.sid || ''
        this.rurl = this.$route.query.rurl
        if (!this.ssjLoanId) {
          this.$zzz.alert.show({
            content: '信息错误'
          })
          return
        }
        this.$http.ykdPost(
          this.$api.getToken,
          {
            data: {
              ssjLoanId: this.ssjLoanId
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
            setTimeout(() => {
              this.$zzz.toast.hide()
              this.$router.replace({
                name: 'signature',
                query: {
                  origin: 'kaniu',
                  type: 'redirect',
                  redirect: this.rurl
                }
              })
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
