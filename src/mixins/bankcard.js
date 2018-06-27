import { BANKCARDDICT } from '@/lib/dict'
export default {
  data() {
    return {
      mixingBankcardTypeMap: BANKCARDDICT.typeMap
    }
  },
  methods: {
    /**
     * 根据银行卡类型过滤银行卡列表
     * @param {Array} list 银行卡列表
     * @param {Number} type 卡类型[1储蓄卡,2信用卡]
     * @return {Array} 过滤的银行卡列表
     */
    filterBankcard(list, type) {
      let _list = []
      list = Array.isArray(list) ? list : []
      let bankcardTypeMap = this.mixingBankcardTypeMap
      _list = list.filter((item, index) => {
        if (bankcardTypeMap[item.bankCardType] === type) {
          return true
        } else {
          return false
        }
      })
      return _list
    },
    getBankcardList(params) {
      return this.$http.ykdPost(this.$api.getBankcardList, {
        data: {
          loanId: params.loanId
        }
      })
      // .then((res) => {
      //   // 查询银行卡列表
      //   console.log(res.data)
      //   if (+res.errorCode === 0) {
      //     this.bankcardList = this.filterBankcard(res.data, 1)
      //     console.log(this.bankcardList)
      //   } else {
      //     this.$zzz.taost.text(res.message)
      //   }
      // })
    }
  }
}
