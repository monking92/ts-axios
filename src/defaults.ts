import { IAxiosRequestConfig } from './types'
import { isPlainObject } from './utils'

const defaults: IAxiosRequestConfig = {
  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  method: 'get',

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [function transformRequest(data) {
    const method = this.method?.toUpperCase()
    // xhr: get head 请求data设置为null
    if (method === 'GET' || method === 'HEAD') {
      return null
    }

    if (isPlainObject(data)) {
      return JSON.stringify(data)
    }

    return data
  }],

  transformResponse: [function transformResponse(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        //
      }
    }
  
    return data
  }]
}

;['delete', 'get', 'head'].forEach(method => {
  defaults.headers[method] = {}
})

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
;['post', 'put', 'patch'].forEach(method => {
  defaults.headers[method] = DEFAULT_CONTENT_TYPE
})

export default defaults
