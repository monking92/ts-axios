import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types'

import xhr from './xhr'
import { buildURL } from './helpers/url'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

export default function axios(config: IAxiosRequestConfig): IAxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
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

function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: IAxiosRequestConfig): any {
  const { method, data } = config

  if (method?.toUpperCase() === 'GET' || method?.toUpperCase() === 'HEAD') {
    return null
  }

  return transformRequest(data)
}

function transformResponseData(res: IAxiosResponse): IAxiosResponse {
  res.data = transformResponse(res.data)

  return res
}
