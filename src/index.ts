import { IAxiosRequestConfig, IAxiosStatic } from './types'
import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import { extend } from './utils'
import defaults from './defaults'
import CancelToken from './cancel/CancelToken'
import Cancel from './cancel/Cancel'

function createInstance(defaultConfig: IAxiosRequestConfig): IAxiosStatic {
  const axios = new Axios(defaultConfig)

  const instance = axios.request.bind(axios)
  extend(instance, axios)

  return instance as IAxiosStatic
}

const axios = createInstance(defaults)
axios.create = function (config: IAxiosRequestConfig): IAxiosStatic {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.isCancel = Cancel.isCancel

export default axios
export * from './types'
