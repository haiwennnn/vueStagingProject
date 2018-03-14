import Axios from 'axios'
import Server from './server.js'

const vm = window.vm

// var vm = new Vue()
// console.log(vm.test)

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
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        params: params
      }).then(res => {
        // console.log(res)
        console.log('----res----')
        let status = res.status
        if (status === 200) {
          // TODO:统一事件处理 [未登录，登录失效，维护等]
          resolve(res.data)
        } else {

        }
      }).catch(err => {
        console.log('----err----')
        reject(err)
      })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        data: params
      }).then(res => {
        console.log('----res----')
        
        resolve(res)
      }).catch(err => {
        console.log('----err----')
        console.log('---' + vm.test + '---')
        reject(err)
      })
    })
  }
}
