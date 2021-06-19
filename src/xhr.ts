import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig): void {
  const method = config.method || 'GET'
  let data = config.data
  if (method.toUpperCase() === 'GET') {
    data = null
  }

  const xhr = new XMLHttpRequest()
  xhr.open(method, config.url)

  for (const key of config.headers) {
    xhr.setRequestHeader(key, config.headers[key])
  }
  xhr.send(data)
}
