// type 定义类型别名
// 字符串字面量类型允许指定字符串必须的固定值
export type MethodType =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'PATCH'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'

export interface IAxiosRequestConfig {
  url?: string
  method?: MethodType
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface IAxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: XMLHttpRequest
}

export interface IAxiosPromise<T=any> extends Promise<IAxiosResponse<T>> {}

export interface IAxiosError extends Error {
  config: IAxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: IAxiosResponse
}

export interface IAxios {
  interceptors: {
    request: IAxiosInterceptorManager<IAxiosRequestConfig>,
    response: IAxiosInterceptorManager<IAxiosResponse>
  }

  request<T>(config: IAxiosRequestConfig): IAxiosPromise<T>

  get<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  delete<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  head<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  options<T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  post<T>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

  put<T>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

  patch<T>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

}

// 接口描述函数类型
export interface IAxiosInstance extends IAxios {
  <T>(config: IAxiosRequestConfig): IAxiosPromise<T>

  <T>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

export interface IAxiosInterceptorManager<T> {
  use(fulfilled: IFulfilledFn<T>, rejected?: IRejectedFn): number
  eject(interceptorId: number): void
}

export interface IFulfilledFn<T> {
  (data: T): T | Promise<T>
}

export interface IRejectedFn {
  (reason: any): any
}
