import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import transformData from './transformData'

import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { processHeaders, flatHeaders } from '../helpers/headers'

export default function dispatchRequest(config: IAxiosRequestConfig): IAxiosPromise {
  processConfig(config)
  return xhr(config).then((res: IAxiosResponse) => {
    return transformData.call(config, res.data, config.transformResponse!)
  })
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformData.call(config, config.data, config.transformRequest!)
  config.headers = transformHeaders(config)
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
