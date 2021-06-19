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
  params?: object
  headers?: object
}
