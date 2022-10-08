export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  // return Object.prototype.toString.call(val) === '[object Object]'
  if (Object.prototype.toString.call(val) !== '[object Object]') return false

  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
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

export function isUndefined(val: any) {
  return typeof val === 'undefined'
}

export function isArray(val: any): boolean {
  return Array.isArray(val)
}

export function isFormData(val: any): boolean {
  return Object.prototype.toString.call(val) === '[object FormData]'
}

export function extend<T, U>(target: T, source: U): T & U {
  for (const key in source) {
    ;(target as T & U)[key] = (source as any)[key]
  }

  return target as T & U
}


export function deepMerge(...objList: any[]): any {
  const result = Object.create(null)

  for (const obj of objList) {
    for (const key in obj) {
      if (isPlainObject(result[key]) && isPlainObject(obj[key])) {
        result[key] = deepMerge(result[key], obj[key])
      } else if (isPlainObject(obj[key])) {
        result[key] = deepMerge(obj[key])
      } else if (isArray(obj[key])) {
        result[key] = obj[key].slice()
      } else {
        result[key] = obj[key]
      }
    }
  }

  return result
}
