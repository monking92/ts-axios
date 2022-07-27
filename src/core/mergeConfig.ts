import { isUndefined, deepMerge, isPlainObject } from '../helpers/utils'
import { IAxiosRequestConfig } from '../types'

function defaultStrategy(val1: any, val2: any) {
  return isUndefined(val2) ? val1 : val2
}

function fromValue2Strategy(val1: any, val2: any) {
  if (!isUndefined(val2)) {
    return val2;
  }
}

function defaultToValue2Strategy(val1: any, val2: any) {
  if (!isUndefined(val2)) {
    return val2;
  } else if (!isUndefined(val1)) {
    return val1;
  }
}

function deepMergeStrategy(val1: any, val2: any) {
  if (isPlainObject(val1) && isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (isPlainObject(val2)) {
    return deepMerge({}, val2)
  } else if (isPlainObject(val1)) {
    return deepMerge({}, val1)
  }

  return val2
}

const strategies = Object.create(null)

const valueFromConfig2Keys = ['url', 'method', 'data']
valueFromConfig2Keys.forEach(key => {
  strategies[key] = fromValue2Strategy
})

const defaultToConfig2Keys = ['timeout', 'responseType']
defaultToConfig2Keys.forEach(key => {
  strategies[key] = defaultToValue2Strategy
})

const deepKeys = ['headers']
deepKeys.forEach(key => {
  strategies[key] = deepMergeStrategy
})


export default function mergeConfig(config1: IAxiosRequestConfig, config2?: IAxiosRequestConfig) {

  config2 = config2 || {}

  const config = Object.create(null)

  const mergeField = function(key: string): void {
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) mergeField(key)
  }

  return config
}
