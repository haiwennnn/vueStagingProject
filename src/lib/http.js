import Axios from 'axios'

// 创建异步请求实例
const instance = Axios.create({
  timeout: 8000,
  withCredentials: false,
  baseURL: 'https://app.chinacreditech.com/'
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
