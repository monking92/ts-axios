import { isPlainObject, isDate } from './utils'

function encode(str: string): string {
  // encodeURIComponent 编码范围大 不会编码：ASCII字母 数字 ~ ! * ( ) '
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

function getParamStr() {}

export function buildURL(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []
  for (let key in params) {
    const val: any = params[key]
    if (val === null || typeof val === 'undefined') continue

    // 数组形式 则`/base/get?foo[]=bar&foo[]=baz`
    if (Array.isArray(val)) {
      for (let item of val) {
        parts.push(`${key}[]=${item}`)
      }
    } else if (isPlainObject(val)) {
      parts.push(encode(key) + '=' + encode(JSON.stringify(val)))
    } else if (isDate(val)) {
      parts.push(encode(key) + '=' + encode(val.toISOString()))
    } else {
      parts.push(encode(key) + '=' + encode(val))
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
