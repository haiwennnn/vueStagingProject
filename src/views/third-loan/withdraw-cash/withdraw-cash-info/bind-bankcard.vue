<template>
  <div class="bind-bankcard-panel"
    v-if="isShow">
    <div class="bind-bankcard-area">
      <div class="title">
        收款银行卡
      </div>
      <cells>
        <cell is-arrow
          @on-cell-item-click="chooseBindBankcard"
          style="padding-left:1rem;">
          <div slot="bd">
            <p style="color:#444;"
              v-if="userSelectedBankcard.bankName">{{userSelectedBankcard.bankName}} ({{userSelectedBankcard.bankCardNo | bankcard4No}})</p>
            <p style="color:#ccc;"
              v-if="!userSelectedBankcard.bankName">请选择银行卡</p>
          </div>
        </cell>
      </cells>
      <p class="descript"
        style="padding-left:.6rem;">&nbsp;
        <span class="show-support-bank">查看支持银行</span>
      </p>
    </div>
    <div class="next-btn"
      v-if="+status === 2">
      <z-button type="primary"
        @click="nextBtnClick">下一步</z-button>
    </div>
  </div>
</template>
<script>
  /**
   * 用户提现银行卡
   */
  import bankcardMixins from '@/mixins/bankcard.js'
  export default {
    mixins: [bankcardMixins],
    props: {
      status: [String, Number]
    },
    data() {
      return {
        userSelectedBankcard: {}
      }
    },
    computed: {
      isShow() {
        if (+this.status === 1) {
          return false
        }
        return true
      }
    },
    watch: {
      status(newVal) {
        if (+newVal === 2) {
          this.getBankcardList({
            loanId: ''
          }).then((res) => {
            if (+res.errorCode === 0) {
              let bankcardList = this.filterBankcard(res.data, 1)
              console.log(bankcardList)
              this.userSelectedBankcard = bankcardList[0]
            } else {
              this.$zzz.toast.text(res.message)
            }
          })
        }
      }
    },
    methods: {
      nextBtnClick() {
        this.$emit('on-withdraw-cash-event', {
          type: 'inputBankcard',
          data: {
            bankcard: this.userSelectedBankcard
          }
        })
      },
      chooseBindBankcard() { }
    }
  }
</script>
<style lang="less" scoped>
  .bind-bankcard-panel {
    // padding-bottom: 0.6rem;
    background-color: #fff;
  }
  .bind-bankcard-area {
    padding-bottom: 0.6rem;
    .title {
      padding: 0.6rem;
      font-size: 0.28rem;
      color: #999;
    }
    .show-support-bank {
      position: absolute;
      // top: 50%;
      bottom: 0;
      right: 0.8rem;
      color: #3060b8;
      // transform: translateY(-50%);
    }
  }
  .next-btn {
    height: 1rem;
    .zz-btn {
      height: 100%;
    }
  }
</style>


