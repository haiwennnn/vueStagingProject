<template>
  <div class="zz-page-body">
    <div class="zz-tab">
      <z-header>信用钱包</z-header>
      <div class="zz-tab__panel">
        <common-layout :uap="true"
          :loan-info="loanInfo">
          <div slot="bd"
            class="main-enter-btn"
            @click="enterBtnEvent">{{enterBtnText}}</div>
        </common-layout>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 信用钱包主页面
   * 查询用户当前状态
   * 根据不同状态或者业务跳转不同页面
   * 业务流走向
   *  |-获取额度
   *  |-提现操作
   *  |-还款页面
   */
  import commonLayout from '../components/commonLayout'
  export default {
    components: {
      commonLayout
    },
    data() {
      return {
        loanInfo: {
          amount: 10000,
          currentRepayAmount: 5000,
          repayDateStr: '',
          tenorStr: ''
        },
        // 用户当前状态,
        userStatus: '',
        enterBtnText: ''
      }
    },
    methods: {
      // 去实名认证
      goRealAuth() {
        this.$router.push({
          name: 'realnameAuth'
        })
      },
      // 去完成资料
      goAddinfo() {
        this.$router.push({
          name: 'addInfo'
        })
      },
      /**
       * 入口按钮事件
       */
      enterBtnEvent() {
        switch (this.userStatus) {
          case 'W01':
            this.goRealAuth()
            break
          case 'W02':
          case 'W03':
            this.goAddinfo()
            break
          case 'W04':
          case 'W05':
            break
          case 'W06':
            break
          default:
            break
        }
      },
      getUserWalletStatus() {
        this.$http.get(this.$api.walletQueryNode).then((res) => {
          console.log(res)
          if (+res.errorCode === 0) {
            let node = res.data.node
            switch (node) {
              case 'W01':
                this.userStatus = node
                this.enterBtnText = '完成实名认证'
                break
              case 'W02':
              case 'W03':
                this.userStatus = node
                this.enterBtnText = '完善个人资料'
                break
              case 'W04':
              case 'W05':
                this.userStatus = node
                this.enterBtnText = '查看额度'
                break
              case 'W06':
                this.userStatus = node
                this.enterBtnText = '去提现'
                break
              default:
                this.userStatus = node
                break
            }
          } else {

          }
        })
      }
    },
    created() {
      this.getUserWalletStatus()
    }
  }
</script>
<style lang="less" scoped>
  .main-enter-btn {
    width: 2.6rem;
    height: 0.96rem;
    line-height: 0.96rem;
    margin: 2rem auto 0;
    color: #444;
    font-size: 0.32rem;
    text-align: center;
    background-color: #f9ca1a;
  }
</style>


