// type 定义类型别名
// 字符串字面量类型允许指定字符串必须的固定值
type MethodType =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
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

export interface IAxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: XMLHttpRequest
}

export interface IAxiosPromise extends Promise<IAxiosResponse> {}

export interface IAxiosError extends Error {
  config: IAxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: IAxiosResponse
}

export interface IAxios {
  request(config: IAxiosRequestConfig): IAxiosPromise

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise

  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise

  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
}

// 接口描述函数类型
export interface IAxiosInstance extends IAxios {
  (config: IAxiosRequestConfig): IAxiosPromise
}
