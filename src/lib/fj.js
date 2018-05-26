const FJ = {}

const deviceInfo = window.deviceInfo
const FJNative = window.FJNative
const messageHandlers = window.webkit && window.webkit.messageHandlers

FJ.getName = function (name) {
  return name + '.' + (new Date()).getTime()
}
FJ.initVue = function (vue) {
  FJ._vue = vue
}

FJ.callback = {}
FJ.callback.list = {}
FJ.callback.add = function (key, succ, fail) {
  this.list[key] = { succ: succ, fail: fail }
}

FJ.callback.trigger = function (key, state, args) {
  this.list[key] && this.list[key][state].call(null, args)
  delete this.list[key]
}

FJ.success = function (name, args) {
  if (deviceInfo) {
    args = FJNative.result()
  }
  // let logInfo = {
  //   functionName: name,
  //   currentPage: window.location.href,
  //   prePage: document.referrer,
  //   uri: {
  //     state: 'succ'
  //   }
  // }
  // window.fjTrace.trace(logInfo)
  FJ.callback.trigger(name, 'succ', args)
}

FJ.fail = function (name, args) {
  if (!deviceInfo) {
    args = FJNative.result()
  }
  // let logInfo = {
  //   functionName: name,
  //   currentPage: window.location.href,
  //   prePage: document.referrer,
  //   uri: {
  //     state: 'fail'
  //   }
  // }
  // window.fjTrace.trace(logInfo)
  FJ.callback.trigger(name, 'fail', args)
}

FJ.exec = function (name, succ, fail, options) {
  if (!window.FJNative) {
    return
  }
  // let logInfo = {
  //   functionName: name,
  //   currentPage: window.location.href,
  //   prePage: document.referrer,
  //   uri: {
  //     option: options || '',
  //     succ: succ ? '@' + succ.toString() + '@' : '',
  //     fail: fail ? '@' + fail.toString() + '@' : ''
  //   }
  // }
  // window.fjTrace.trace(logInfo)

  let namespaces = name.split('.')
  name = namespaces[0]
  FJ.callback.add(namespaces.join('.'), succ, fail)
  if (deviceInfo) {
    if (!messageHandlers[name]) {
      return
    }
    if (options) {
      messageHandlers[name].postMessage(options)
    } else {
      messageHandlers[name].postMessage(null)
    }
  } else {
    if (!FJNative[name]) {
      return
    }
    if (options) {
      FJNative[name](options)
    } else {
      FJNative[name]()
    }
  }
}

FJ.setStore = function (key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

FJ.fromStore = function (key, obj) {
  var store = FJ.getStore(key)
  if (typeof store === 'object' && store != null) {
    Object.keys(store).forEach(function (v, k) {
      obj[v] = store[v]
    })
  }
  return obj
}

FJ.toStore = function (key, obj) {
  var store = FJ.getStore(key)
  if (typeof store === 'object' && store != null) {
    Object.keys(obj).forEach(function (v, k) {
      store[v] = obj[v]
    })
  } else {
    store = obj
  }
  this.setStore(key, store)
  return store
}

FJ.removeStore = function (key) {
  localStorage.removeItem(key)
}

FJ.clearStore = function () {
  localStorage.clear()
}

FJ.getStore = function (key) {
  var obj = localStorage.getItem(key)
  if (obj) {
    try {
      obj = JSON.parse(obj)
    } catch (e) {

    }
  }
  return obj
}

FJ.setSessionStore = function (key, obj) {
  sessionStorage.setItem(key, JSON.stringify(obj))
}
FJ.getSessionStore = function (key) {
  var obj = sessionStorage.getItem(key)
  if (obj) {
    try {
      obj = JSON.parse(obj)
    } catch (e) {

    }
  }
  return obj
}

FJ.formatDate = function (v, fmt) {
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

export default FJ
