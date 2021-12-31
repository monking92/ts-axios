import axios from '../../src/index'
import { IAxiosRequestConfig, IAxiosResponse } from '../../src/types'

axios.interceptors.request.use((config: IAxiosRequestConfig) => {
  config.headers.foo += '1'
  return config
})

axios.interceptors.request.use((config: IAxiosRequestConfig) => {
  config.headers.foo += '2'
  return config
})

axios.interceptors.request.use((config: IAxiosRequestConfig) => {
  config.headers.foo += '3'
  return config
})

axios.interceptors.response.use((res: IAxiosResponse) => {
  res.data.data.bar += '1'
  return res
})

const interceptor: number = axios.interceptors.response.use((res: IAxiosResponse) => {
  res.data.data.bar += '2'
  return res
})

axios.interceptors.response.eject(interceptor)

axios.interceptors.response.use((res: IAxiosResponse) => {
  res.data.data.bar += '3'
  return res
})

axios({
  method: 'post',
  url: '/interceptor/post',
  headers: {
    foo: '0'
  },
  data: {
    msg: 'axios'
  }
}).then(res => {
  console.log('axios: ', res)
})
