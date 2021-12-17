export function isPlainObject(val: any): val is Object {
  return Object.prototype.toString.call(val) === '[object Object]'
}

// 类型谓词：`parameterName is Type`
// 每当调用 isDate 时 ts会将变量缩减为那个具体的类型
// if (isDate(val)) {
//   // val 为Date类型
//   val.toISOString()
// } else {
//   // val 非Date类型
// }
export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function extend<T, U>(target: T, source: U): T & U {
  for (const key in source) {
    ;(target as T & U)[key] = (source as any)[key]
  }

  return target as T & U
}
