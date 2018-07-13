<template>
  <div></div>
</template>
<script>
  /**
   * 第三方贷款入口
   * 在此页面进行初步用户信息认证
   * 1.获取query信息调用接口认证用户是否合法
   *  |-1.1 用户合法进入登录页面
   *  |-1.2 用户不合法进入404页面
   */
  export default {
    data() {
      return {
        query: null
      }
    },
    methods: {
      checkToken() {
        let query = this.query
        // 验签是否通过
        this.$http.post(this.$api.walletEnterTokenValidator, {
          data: {
            token: query.token || '',
            mobileNo: query.mobileNo || '',
            fjChnlCode: query.fjChnlCode || '',
            sign: decodeURIComponent(query.sign) || '',
            timestamp: query.timestamp || ''
          }
        }).then((res) => {
          if (+res.errorCode === 0) {
            this.$router.push({
              name: 'login',
              query: {
                phone: query.mobileNo,
                t: new Date().getTime()
              }
            })
          } else {
            this.$zzz.toast.text(res.message)
            // this.$router.push({
            //   name: '404'
            // })
          }
        })
      }
    },
    created() {
      this.query = this.$route.query || {}
      this.checkToken()
    }
  }
</script>
<style lang="less" scoped>
</style>


