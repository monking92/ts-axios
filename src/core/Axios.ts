import {
  MethodType, IAxiosRequestConfig, IAxiosResponse, IAxiosPromise,
  IFulfilledFn, IRejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface IInterceptor {
  request: InterceptorManager<IAxiosRequestConfig>,
  response: InterceptorManager<IAxiosResponse>
}

interface IPromiseChain<T> {
  fulfilled: IFulfilledFn<T> | ((config: IAxiosRequestConfig) => IAxiosPromise),
  rejected?: IRejectedFn
}

export default class Axios {
  defaults: IAxiosRequestConfig
  interceptors: IInterceptor

  constructor(instanceConfig: IAxiosRequestConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>()
    }
  }

  request(url: any, config?: IAxiosRequestConfig): IAxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }

    const promiseChain: IPromiseChain<any>[] = [{
      fulfilled: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.each((interceptor: IPromiseChain<IAxiosRequestConfig>) => {
      promiseChain.unshift(interceptor)
    })

    this.interceptors.response.each((interceptor: IPromiseChain<IAxiosResponse>) => {
      promiseChain.push(interceptor)
    })

    // let promise = Promise.resolve<any>(promiseChain.shift())
    let promise = Promise.resolve<any>(config)

    while(promiseChain.length) {
      const { fulfilled, rejected } = promiseChain.shift()!
      promise = promise.then(fulfilled, rejected)
    }
    return promise
    // return dispatchRequest(config!)
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

  _requestMethodWithData(method: MethodType, url: string, data?: any, config?: IAxiosRequestConfig ): IAxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
