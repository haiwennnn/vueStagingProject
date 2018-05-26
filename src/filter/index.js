export default {
  init: function (Vue) {
    Vue.filter('formatTime', function (d, fmt) {
      fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
      if (!d) {
        return ''
      }
      return window.FJ.formatDate(d, fmt)
    })
    Vue.filter('toFixed2', function (v) {
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
