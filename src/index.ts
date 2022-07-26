import { IAxiosInstance, IAxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

function createInstance(defaultConfig: IAxiosRequestConfig): IAxiosInstance {
  const axios = new Axios(defaultConfig)

  const instance = axios.request.bind(axios)
  extend(instance, axios)

  return instance as IAxiosInstance
}

export default createInstance(defaults)
export * from './types'
