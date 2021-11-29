// export function isPlainObject(val: any): val is Object {
export function isPlainObject(val: any) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export function isDate(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object Date]'
}
