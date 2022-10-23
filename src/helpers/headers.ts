import { isPlainObject, deepMerge } from '../utils'
import { MethodType } from '../types'

/* function normalizedHeaderKey(key: string): string {
  return key.replace(/(\b|-)[a-z]/g, function(char) {
    return char.toUpperCase()
  })
} */

function normalizedHeaderKey(headers: any, normalizedKey: string): void {
  for (const key in headers) {
    if (key !== normalizedKey && key.toUpperCase() === normalizedKey.toUpperCase()) {
      headers[normalizedKey] = headers[key]
      delete headers[key]
    }
  }
}

// application/json;charset=UTF-8
// application/x-www-form-urlencoded;charset=UTF-8
export function processHeaders(headers: any, data: any): any {
  normalizedHeaderKey(headers, 'Accept')
  normalizedHeaderKey(headers, 'Content-Type')

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

export function flatHeaders(headers: any, method: MethodType) {
  const flatedHeaders = deepMerge(
    headers.common || {},
    headers[method] || {},
    headers
  )

  ;['delete', 'get', 'head', 'post', 'put', 'patch', 'common'].forEach(key => {
    delete flatedHeaders[key]
  })

  return flatedHeaders
}
