import { isPlainObject } from './utils'

function normalizedHeaderKey(key: string): string {
  return key.replace(/(\b|-)[a-z]/g, function(char) {
    return char.toUpperCase()
  })
}

// application/json;charset=UTF-8
// application/x-www-form-urlencoded;charset=UTF-8
export function processHeaders(headers: any, data: any): any {
  for (const key in headers) {
    const nKey = normalizedHeaderKey(key)
    headers[nKey] = headers[key]

    if (key !== nKey) {
      delete headers[key]
    }
  }

  if (isPlainObject(data) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  }

  return headers
}

// 解析响应头
export function parseResponseHeaders(header: string): any {
  if (header) {
    const parsedHeader = Object.create(null)

    const headerList: string[] = header.split('\r\n')
    for (const headerItem of headerList) {
      if (headerItem.trim()) {
        const [key, value] = headerItem.trim().split(': ')
        parsedHeader[key] = value
      }
    }

    return parsedHeader
  }

  return header
}
