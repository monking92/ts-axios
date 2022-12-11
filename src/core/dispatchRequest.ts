import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import transformData from './transformData'

import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { processHeaders, flatHeaders } from '../helpers/headers'

export default function dispatchRequest(config: IAxiosRequestConfig): IAxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then((res: IAxiosResponse) => {
    res.data = transformData.call(config, res.data, config.transformResponse!)

    return res
  })
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformData.call(config, config.data, config.transformRequest!)
  config.headers = flatHeaders(config.headers, config.method!)
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function throwIfCancellationRequested(config: IAxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
