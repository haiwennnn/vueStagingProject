import axios from 'axios'
import qs from 'qs'

//创建异步请求实例
const instance = Axios.create({
  timeout: 5000,
  withCredentials: false
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

export default instance