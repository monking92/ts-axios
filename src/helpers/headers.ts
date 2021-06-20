import { isPlainObject } from './utils'

function normalizedHeaderKey(key: string): string {
  return key.replace(/(\b|-)[a-z]/g, function(char) {
    return char.toUpperCase()
  })
}

export default function processHeaders(headers: any, data: any): any {
  if (!headers) return {}

  for (const key of headers) {
    headers[normalizedHeaderKey(key)] = headers[key]
    delete headers[key]
  }

  if (isPlainObject(data) && !headers.hasOwnProperty('Content-Type')) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  debugger
  return headers
}
