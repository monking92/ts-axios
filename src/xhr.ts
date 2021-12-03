import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise(resolve => {
    let { url, method = 'GET', data = null, headers, responseType } = config

    if (method.toUpperCase() === 'GET') {
      data = null
    }

    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
        const responseHeaders = xhr.getAllResponseHeaders()

        const response: IAxiosResponse = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          config,
          request: xhr
        }

        resolve(response)
      }
    }

    // 初始化一个请求
    // param: method, url, async, user, password
    xhr.open(method, url, true)

    // open() send() 之间设置responseType
    if (responseType) {
      xhr.responseType = responseType
    }

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
  })
}
