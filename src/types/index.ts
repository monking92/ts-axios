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
  url: string
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
