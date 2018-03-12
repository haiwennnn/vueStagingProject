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

export default FJ
