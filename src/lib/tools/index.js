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

export default tool
