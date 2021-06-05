import { IAxiosRequestConfig } from './types'

import xhr from './xhr'

export default function axios(config: IAxiosRequestConfig): any {
  console.log('axios request.......')
  return new Promise((resolve, reject) => {
    xhr(config)
  })
}
