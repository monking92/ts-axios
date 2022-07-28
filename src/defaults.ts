import { IAxiosRequestConfig } from './types'

const defaults: IAxiosRequestConfig = {
  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  method: 'get'
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
