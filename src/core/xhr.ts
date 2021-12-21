import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse, IAxiosError } from '../types'
import { parseResponseHeaders } from '../helpers/headers'
import createError from '../helpers/error'

export default function xhr<T>(config: IAxiosRequestConfig): IAxiosPromise<T> {
  return new Promise((resolve, reject) => {
    let { url, method = 'GET', data = null, headers, responseType, timeout = 0 } = config

    if (method.toUpperCase() === 'GET') {
      data = null
    }

    let xhr: any = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
      // network errors or timeout status is 0
      if (xhr.status === 0) {
        return
      }

      if (xhr.readyState === XMLHttpRequest.DONE) {
        const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
        const responseHeaders = parseResponseHeaders(xhr.getAllResponseHeaders())

        const response: IAxiosResponse<T> = {
          data: <T>responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          config,
          request: xhr
        }

        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call handleResponse on the next 'tick'
        setTimeout(() => handleResponse<T>(resolve, reject, config, xhr, response))
      }
    }

    xhr.timeout = timeout

    // network errors
    xhr.addEventListener('error', () => {
      reject(createError(`Network Error`, config, null, xhr))

      // clean xhr
      xhr = null
    })

    xhr.addEventListener('timeout', () => {
      reject(createError(`timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', xhr))

      // clean xhr
      xhr = null
    })

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

function handleResponse<T>(
  resolve: (value: IAxiosResponse<T>) => void,
  reject: (reason: IAxiosError) => void,
  config: IAxiosRequestConfig,
  xhr: XMLHttpRequest,
  response: IAxiosResponse<T>
): void {
  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    reject(
      createError(
        `Request failed with status code ${response.status}` as string,
        config,
        null,
        xhr,
        response
      )
    )
  }
}
