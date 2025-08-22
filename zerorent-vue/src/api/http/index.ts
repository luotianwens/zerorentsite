/* import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 可在此添加token等
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error.response?.data || error.message)
  }
)

export default instance
 */

import { ApiProxy } from '@/types'
import { isFormData } from '@/utils'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import HttpWrapper from './apiProxy'




const instance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 1000 * 10,
  headers: { 
    'Content-Type': 'application/json'
  },
  transformRequest: [
    data => {
      if (isFormData(data)) {
        return data
      }
      return JSON.stringify(data)
    }
  ]
})

// 响应拦截器
instance.interceptors.response.use(
  (res) => res.data,
  error => {
    return Promise.reject(error.response?.data || error.message)
  }
)


export default HttpWrapper(instance)
// export default instance
