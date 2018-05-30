<template>
  <div></div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {
      let query = this.$route.query
      let accessToken = query.accessToken
      let idFintechUmUser = query.idFintechUmUser
      let walletUserInfo = {}
      console.log(accessToken)
      console.log(idFintechUmUser)
      if (accessToken && idFintechUmUser) {
        walletUserInfo = {
          accessToken: accessToken,
          idFintechUmUser: idFintechUmUser,
          phone: '',
          token: '',
          username: ''
        }
        window.FJ.setStore('walletUserInfo', walletUserInfo)
        // 需要增加获取详细用户信息操作
        this.$router.replace({
          name: 'thirdRepayIndex'
        })
      } else {
        // go 404
      }
    }
  }
</script>
<style scoped>
</style>

