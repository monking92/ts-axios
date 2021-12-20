import { MethodType, IAxiosRequestConfig, IAxiosPromise } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: IAxiosRequestConfig): IAxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config!)
  }

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethod('get', url, config)
  }

  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethod('delete', url, config)
  }

  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethod('head', url, config)
  }

  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethod('options', url, config)
  }

  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    // PATCH is sensitive
    return this._requestMethodWithData('PATCH', url, data, config)
  }

  _requestMethod(method: MethodType, url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(
    method: MethodType,
    url: string,
    data?: any,
    config?: IAxiosRequestConfig
  ): IAxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
