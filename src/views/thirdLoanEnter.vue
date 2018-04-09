<template>
  <div class="zz-page-body signature-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>第三方贷款入口</z-header>
        <div class="zz-tab__panel zz-tab__panel_hastabbar"></div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 第三方贷款入口页面
   */
  export default {
    data() {
      return {
        ssjLoanId: '',
        rurl: ''
      }
    },
    created() {
      this.ssjLoanId = this.$route.query.sid || 'N153521352658220'
      this.rurl = this.$route.query.rurl
      this.$zzz.toast.show({
        text: '正在获取用户信息',
        time: 0,
        type: 'loading',
        position: 'middle'
      })
      this.$api.getToken(this.ssjLoanId).then(res => {
        if (+res.errorCode === 0) {
          let data = res.data
          window.FJ.setStore('userInfo', {
            accessToken: data.accessToken,
            idFintechUmUser: data.idFintechUmUser
          })
          setTimeout(() => {
            this.$zzz.toast.hide()
            this.$router.push({
              name: 'signature',
              query: {
                redirect: this.rurl
              }
            })
          }, 1500)
        } else {
          this.$zzz.toast.text('获取用户信息失败', '')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style lang="less" scoped>

</style>
