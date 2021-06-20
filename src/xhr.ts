import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig): void {
  const { url, method = 'GET', data = null, headers } = config

  if (method.toUpperCase() === 'GET') {
    data = null
  }

  const xhr = new XMLHttpRequest()
  xhr.open(method, url)

  for (const key in headers) {
    // "noImplicitAny": true in tsconfig
    xhr.setRequestHeader(key, headers[key])
    // xhr.setRequestHeader(key, headers[key as keyof typeof headers])
  }

  xhr.send(data)
}
