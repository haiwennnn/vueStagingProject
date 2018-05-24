import Axios from 'axios'
import Server from '../api-server'

// let API_ENV = process.env.API_ENV || 'uat'
// let server = Server.get(API_ENV)
// console.log(Server)
// 创建异步请求实例
const instance = Axios.create({
  timeout: 5000,
  withCredentials: false,
  baseURL: Server.path.base
})

instance.interceptors.request.use((config) => {
  let userInfo = window.FJ.getStore('userInfo') || {}
  config.headers.accessToken = userInfo.accessToken || ''
  config.headers.walletToken = userInfo.token || ''
  config.headers.idFintechUmUser = userInfo.idFintechUmUser || ''
  config.headers.timeStamp = (new Date()).getTime() + ''
  console.log(config)
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
  return res
}, (error) => {
  return Promise.reject(error)
})

function catchAjaxError(err) {
  console.log(err)
  let vm = window.vm
  let status = err.response && err.response.status
  let code = err.code || err.message
  console.log(`-status:${status}-code:${code}`)
  if (!status) {
    /* 请求超时 */
    if (code === 'ECONNABORTED') {
      status = 'timeout'
      vm.$zzz.toast.text('请求超时,请稍后重试')
    } else if (code === 'Network Error') {
      vm.$zzz.toast.text('网络连接错误，请重试')
    } else {
      vm.$zzz.toast.hide()
    }
  } else if (status === 404) {
    vm.$zzz.toast.text('404错误,请稍后重试')
  } else if (status >= 400 && status < 500) {
    vm.$zzz.toast.text(status + '错误,请稍后重试')
  } else if (status >= 500 && status < 600) {
    vm.$zzz.toast.text(status + '错误,请稍后重试')
  } else {
    vm.$zzz.toast.text('发生了未知的错误,请稍后重试')
  }
}

export default {
  get(url, params, config) {
    let vm = window.vm
    // let userInfo = window.FJ.getStore('userInfo') || {}

    // let headers = {
    //   'walletToken': userInfo.accessToken || '',
    //   'idFintechUmUser': userInfo.idFintechUmUser || '',
    //   'timeStamp': (new Date()).getTime() + ''
    // }
    if (config && config.toast !== false) {
      vm.$zzz.toast.show({
        text: '正在请求',
        type: 'loading',
        position: 'middle',
        time: 0,
        isShowMask: true
      })
    }

    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        // headers: headers,
        params: params
      }).then(res => {
        vm.$zzz.toast.hide()
        let status = res.status
        if (status === 200) {
          // TODO:统一事件处理 [未登录，登录失效，维护等]
          resolve(res.data)
        } else {
          vm.$zzz.toast.text('错误')
        }
      }).catch(err => {
        console.log(`---get 请求异常---`)
        catchAjaxError(err)
        reject(err)
      })
    })
  },
  post(url, params, config) {
    var vm = window.vm
    // let userInfo = window.FJ.getStore('userInfo') || {}

    // let headers = {
    //   'walletToken': userInfo.accessToken || '',
    //   'idFintechUmUser': userInfo.idFintechUmUser || '',
    //   'timeStamp': (new Date()).getTime() + ''
    // }
    if (config && config.toast !== false) {
      vm.$zzz.toast.show({
        text: '正在请求',
        type: 'loading',
        position: 'middle',
        time: 0,
        isShowMask: true
      })
    }
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        // headers: headers,
        data: params.data
      }).then(res => {
        let status = res.status
        vm.$zzz.toast.hide()
        if (status === 200) {
          // TODO:统一事件处理 [未登录，登录失效，维护等]
          resolve(res.data)
        } else {
        }
      }).catch(err => {
        console.log(`---post 请求异常---`)
        catchAjaxError(err)
        reject(err)
      })
    })
  }
}
