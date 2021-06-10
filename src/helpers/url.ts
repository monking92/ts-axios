import { isPlainObject } from './utils'

function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params: any): string {
  if (!params) return url

  let parts = []
  for (let key in params) {
    if (!params[key]) continue

    if (Array.isArray(params[key])) {
      for (let item of params[key]) {
        parts.push(`${key}[]=${item}`)
      }
    } else if (isPlainObject(params[key])) {
      parts.push(encode(key) + '=' + encode(JSON.stringify(params[key])))
    } else {
      parts.push(encode(key) + '=' + encode(params[key]))
    }
  }

  const serializedParams = parts.join('&')

  const hashmarkIndex = url.indexOf('#')
  if (hashmarkIndex >= 0) {
    url = url.slice(0, hashmarkIndex)
  }

  url += (url.includes('?') ? '&' : '?') + serializedParams

  return url
}
