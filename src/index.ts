import { IAxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): IAxiosInstance {
  const axios = new Axios()

  const instance = axios.request.bind(axios)
  extend(instance, axios)

  return instance as IAxiosInstance
}

export default createInstance()
export * from './types'
