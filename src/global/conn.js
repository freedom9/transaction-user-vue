import axios from 'axios'
// import app from '../main.js' // import the instance
// import router from './router.js'
// import Vue from 'vue'
import store from '../store'
import Cookies from 'js-cookie'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-type': 'application/json'
  },
  timeout: 0 // 请求超时时间
})

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // token
  config.headers['token'] = Cookies.get('token')
  const { ...data } = config.data
  if (config.method === 'get') {
    config.params = data // get请求参数必须为params: {}
  } else {
    config.data = data // data: {}只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  }
  return config
})

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 统一处理返回值
  if (response.data.code === 401 || response.data.code === 403) {
    // router.push('/login')
    // Vue.$message.error(response.data.msg)
    store.commit('setLoginDialg', true)
    return Promise.reject(new Error({ code: response.data.code, msg: response.data.msg }))
  } else {
    return Promise.resolve(response.data)
  }
}, (error) => {
  return error
})

export default axiosInstance
