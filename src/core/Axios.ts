import { MethodType, IAxiosRequestConfig, IAxiosPromise } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request<T>(url: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config!)
  }

  get<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethod('get', url, config)
  }

  delete<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethod('delete', url, config)
  }

  head<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethod('head', url, config)
  }

  options<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethod('options', url, config)
  }

  post<T>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithData('post', url, data, config)
  }

  put<T>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch<T>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    // PATCH is sensitive
    return this._requestMethodWithData('PATCH', url, data, config)
  }

  _requestMethod<T>(method: MethodType, url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData<T>(method: MethodType, url: string, data?: any, config?: IAxiosRequestConfig ): IAxiosPromise<T> {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
