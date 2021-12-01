import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig): void {
  let { url, method = 'GET', data = null, headers } = config

  if (method.toUpperCase() === 'GET') {
    data = null
  }

  const xhr = new XMLHttpRequest()
  // 初始化一个请求
  // param: method, url, async, user, password
  xhr.open(method, url, true)

  for (const key in headers) {
    if (data === null && headers[key] === 'Content-Type') {
      delete headers[key]
    } else {
      // "noImplicitAny": true in tsconfig
      // "suppressImplicitAnyIndexErrors": true
      xhr.setRequestHeader(key, headers[key])
      // xhr.setRequestHeader(key, headers[key as keyof typeof headers])
    }
  }

  // 发送请求 异步（默认）-则请求发送后立即返回 同步-则收到响应后才返回
  // GET HEAD请求 则应将参数设置为 null
  // data 类型：
  // 1. `Document` 发送前被序列化
  // 2. `XMLHttpRequestBodyInit` 可以是 `Blob` `BufferSource` `FormData` `URLSearchParams` `USVString`
  // 3. `null`
  xhr.send(data)
}
