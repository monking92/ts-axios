import { isPlainObject } from './utils'

function normalizedHeaderKey(key: string): string {
  return key.replace(/(\b|-)[a-z]/g, function(char) {
    return char.toUpperCase()
  })
}

export default function processHeaders(headers: any, data: any): any {
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
