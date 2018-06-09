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
      let accessToken = query.token
      let idFintechUmUser = query.fintechUmuserId
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

        setTimeout(() => {
          this.$router.replace({
            name: 'thirdRepayIndex'
          })
        }, 500)
      } else {
        // go 404
      }
    },
    mounted() {
      this.$nextTick(() => {
        let hideHeader = this.$route.query['hide-header'] || 't'
        if (hideHeader === 't') {
          document.getElementById('app').setAttribute('class', 'hide-header')
        }
      })
    }
  }
</script>
<style scoped>
</style>

