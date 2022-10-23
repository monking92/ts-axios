import { isObject, isDate } from '../utils'

interface IOriginURL {
  protocol: string,
  host: string
}

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

export function buildURL(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []
  for (let key in params) {
    let val: any = params[key]
    if (val === null || typeof val === 'undefined') continue

    // 数组形式 则`/base/get?foo[]=bar&foo[]=baz`
    if (Array.isArray(val)) {
      key = key + '[]'
    } else {
      val = [val]
    }

    for (let item of val) {
      if (isDate(item)) {
        item = item.toISOString()
      } else if (isObject(item)) {
        item = JSON.stringify(item)
      }
      parts.push(encode(key) + '=' + encode(item))
    }
  }

  const serializedParams = parts.join('&')
  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')
    if (hashmarkIndex >= 0) {
      url = url.slice(0, hashmarkIndex)
    }

    url += (url.includes('?') ? '&' : '?') + serializedParams
  }

  return url
}

const urlParsingNode = document.createElement('a')

function resolveURL(url: string): IOriginURL {
  urlParsingNode.setAttribute('href', url)

  return {
    protocol: urlParsingNode.protocol,
    host: urlParsingNode.host
  }
}

export function isURLSameOrigin(url: string): boolean {
  const { protocol, host } = resolveURL(url)
  const { protocol: curProtocol, host: curHost } = window.location
  return protocol === curProtocol && host === curHost
}
