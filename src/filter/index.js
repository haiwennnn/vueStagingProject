export default {
  init: function (Vue) {
    /**
     * 格式化时间
     * @param {Date} d 传入时间
     * @param {String} fmt 格式化格式'yyyy-MM-dd hh:mm:ss'
     */
    Vue.filter('formatTime', function (d, fmt) {
      fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
      if (!d) {
        return ''
      }
      return window.FJ.formatDate(d, fmt)
    })
    Vue.filter('toFixed2', function (v) {
      if (!v) {
        return '---'
      }
      return parseFloat(v).toFixed(2)
    })
    Vue.filter('hideFullName', function (n) {
      if (!n) return ''
      if (n.length === 1) {
        return n + '*'
      } else if (n.length > 1) {
        return n.substring(0, 1) + '*'
      } else {
        return ''
      }
    })
    Vue.filter('bankcard4No', function (cardNo, n) {
      n = n || 4
      if (!cardNo || cardNo.length === 0) {
        return ''
      } else {
        return cardNo.substring(cardNo.length - 4, cardNo.length)
      }
    })
  }
}
