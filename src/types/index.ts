// type 定义类型别名
// 字符串字面量类型允许指定字符串必须的固定值
type MethodType =
  | 'get' | 'GET'
  | 'post' | 'POST'
  | 'head' | 'HEAD'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'delete' | 'DELETE'
  | 'options' | 'OPTIONS'

export interface IAxiosRequestConfig {
  url: string
  method?: MethodType
  data?: any
  params?: object
  headers?: object
}
