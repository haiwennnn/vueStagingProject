const tool = {}

tool.convertBase64UrlToBlob = function (urlData) {
  var bytes
  if (urlData.split(',').length === 2) {
    bytes = window.atob(urlData.split(',')[1])
  } else {
    bytes = window.atob(urlData)
  }
  var ab = new ArrayBuffer(bytes.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/png' })
}

tool.formatDate = function (v, fmt) {
  if (typeof v === 'string') {
    if (v === '长期') {
      v = new Date()
      v.setFullYear(v.getFullYear() + 100)
    } else {
      v = v.slice(0, 4) + '/' + v.slice(4, 6) + '/' + v.slice(6, 8)
    }
  }
  var d = new Date(v)
  var o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export default tool
