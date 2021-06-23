import { IAxiosRequestConfig } from './types'

import xhr from './xhr'
import { buildURL } from './helpers/url'
import processHeaders from './helpers/headers'
import { isPlainObject } from './helpers/utils'

export default function axios(config: IAxiosRequestConfig): any {
  console.log('axios request.......')
  return new Promise((resolve, reject) => {
    processConfig(config)
    xhr(config)
  })
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformHeaders (config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: IAxiosRequestConfig): any {
  const { method, data } = config

  if (method?.toUpperCase() === 'GET' || method?.toUpperCase() === 'HEAD') {
    return null
  }

  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
