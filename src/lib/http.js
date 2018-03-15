import Axios from 'axios'
import Server from './server.js'

let API_ENV = process.env.API_ENV
let server = Server.get(API_ENV)

// 创建异步请求实例
const instance = Axios.create({
  timeout: 8000,
  withCredentials: false,
  baseURL: server.base
})

instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
  return res
}, (error) => {
  return Promise.reject(error)
})

export default {
  get(url, params) {
    let vm = window.vm
    let userInfo = window.FJ.getStore('userInfo') || {}

    let headers = {
      'accessToken': userInfo.accessToken || '',
      'idFintechUmUser': userInfo.idFintechUmUser || '',
      'timeStamp': (new Date()).getTime() + ''
    }
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        headers: headers,
        params: params
      }).then(res => {
        let status = res.status
        if (status === 200) {
          // TODO:统一事件处理 [未登录，登录失效，维护等]
          resolve(res.data)
        } else {
        }
      }).catch(err => {
        console.log('---' + vm.test + '---')
        reject(err)
      })
    })
  },
  post(url, params) {
    var vm = window.vm
    let userInfo = window.FJ.getStore('userInfo') || {}

    let headers = {
      'accessToken': userInfo.accessToken || '',
      'idFintechUmUser': userInfo.idFintechUmUser || '',
      'timeStamp': (new Date()).getTime() + ''
    }
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        headers: headers,
        data: params
      }).then(res => {
        let status = res.status
        if (status === 200) {
          // TODO:统一事件处理 [未登录，登录失效，维护等]
          resolve(res.data)
        } else {
        }
      }).catch(err => {
        console.log('---' + vm.test + '---')
        reject(err)
      })
    })
  }
}
