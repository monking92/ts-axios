import { IAxiosRequestConfig } from './types'

import xhr from './xhr'
import { buildURL } from './helpers/url'

export default function axios(config: IAxiosRequestConfig): any {
  console.log('axios request.......')
  return new Promise((resolve, reject) => {
    processConfig(config)
    xhr(config)
  })
}

function processConfig(config: IAxiosRequestConfig) {
  config.url = transformURL(config)
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}
