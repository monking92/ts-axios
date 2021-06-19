function normalizedKey(key: string): string {
  return key.replace(/(\b|-)[a-z]/g, function(char) {
    return char.toUpperCase()
  })
}

export default function processHeaders(headers: any): any {
  if (!headers) return

  for (const key of headers) {
    headers[normalizedKey(key)] = headers[key]
    delete headers[key]
  }

  if (!headers.hasOwnProperty('Content-Type')) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  debugger
  return headers
}
