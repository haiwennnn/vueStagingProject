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
      let userInfo = {}
      console.log(accessToken)
      console.log(idFintechUmUser)
      if (accessToken && idFintechUmUser) {
        userInfo = {
          accessToken: accessToken,
          idFintechUmUser: idFintechUmUser,
          phone: '13076965109',
          token: '',
          username: '晏海文'
        }
        window.FJ.setStore('userInfo', userInfo)
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

