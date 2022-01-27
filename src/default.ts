import { IAxiosRequestConfig } from './types'

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const defaults: IAxiosRequestConfig = {
  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

;['delete', 'get', 'head'].forEach(method => {
  defaults.headers[method] = {}
})

;['post', 'put', 'patch'].forEach(method => {
  defaults.headers[method] = {}
})

export default defaults
