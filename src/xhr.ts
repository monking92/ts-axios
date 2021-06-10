import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig): void {
  const method = config.method || 'GET'
  let data = config.data
  if (method.toUpperCase() === 'GET') {
    data = null
  }

  const xhr = new XMLHttpRequest()
  xhr.open(method, config.url)
  xhr.send(data)
}
