<template>
  <div class="bind-bankcard-panel"
    :class="{'cover':+status !== 2}"
    v-if="isShow">
    <div class="bind-bankcard-area">
      <div class="title">
        收款银行卡
      </div>
      <cells v-if="userBankcardDataList.length === 0">
        <cell is-arrow
          @on-cell-item-click="addBindBankcard"
          style="padding-left:1rem;">
          <div slot="bd">
            <p style="color:#ccc;"
              v-if="!userSelectedBankcard.bankName">增加银行卡</p>
          </div>
        </cell>
      </cells>
      <z-form v-if="userBankcardDataList.length > 0">
        <popup-picker v-model="userSelectedBankcardIndex"
          valueTextAlign="center"
          :data="userBankcardDataList"></popup-picker>
      </z-form>
      <p class="descript"
        style="padding-left:.6rem;">&nbsp;
        <!-- <span class="show-support-bank">查看支持银行</span> -->
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
        userSelectedBankcard: {},
        userBankcardDataList: [],
        userSelectedBankcardIndex: [],
        bankcardIdMap: {}
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
              let bankcardFormatData = this.formatBankcardData(bankcardList)
              console.log(bankcardFormatData.list)
              this.userBankcardDataList = bankcardFormatData.list
              this.bankcardIdMap = bankcardFormatData.idMap
            } else {
              this.$zzz.toast.text(res.message)
            }
          })
        }
      }
    },
    methods: {
      nextBtnClick() {
        let userSelectedBankcardIndex = this.userSelectedBankcardIndex
        if (userSelectedBankcardIndex.length === 0) {
          this.$zzz.toast.text('请选择一张收款卡')
          return
        }
        let userSelectedBankcard = this.bankcardIdMap[userSelectedBankcardIndex[0]]

        this.$emit('on-withdraw-cash-event', {
          type: 'inputBankcard',
          data: {
            bankcard: userSelectedBankcard
          }
        })
      },
      /**
       * 格式化选择器银行卡数据
       */
      formatBankcardData(data) {
        let list = []
        let idMap = {}
        data.forEach((item, index) => {
          idMap[item.id] = item
          let cardNo = item.bankCardNo
          list.push({
            name: `${item.bankName}(${cardNo.substring(cardNo.length - 4, cardNo.length)})`,
            value: item.id + ''
          })
        })
        return {
          list,
          idMap
        }
      },
      addBindBankcard() {
        this.$router.push({
          name: 'bindBankcard'
        })
      }
    },
    created() {

    }
  }
</script>
<style lang="less" scoped>
  .bind-bankcard-panel {
    // padding-bottom: 0.6rem;
    position: relative;
    background-color: #fff;
  }
  .bind-bankcard-panel.cover {
      &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 5;
      }
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


