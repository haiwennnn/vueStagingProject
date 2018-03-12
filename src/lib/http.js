import Axios from 'axios'
import Server from './server.js'
// import Vue from 'vue'
// var vm = window.vm
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
        resolve(res)
      }).catch(err => {
        console.log(err)
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
      })
    })
  }
}
