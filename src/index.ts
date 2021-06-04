import { IAxiosRequestConfig } from './types'

export default function axios(config: IAxiosRequestConfig): void {
  const { url, method = 'get', data = null } = config

  const xhr = new XMLHttpRequest()
}

// axios({
//   url: '',
//   method: "get"
// })
