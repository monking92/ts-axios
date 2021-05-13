import { IAxiosConfig } from './types'

export default function axios(config: IAxiosConfig):void {
  const { url, method = 'get', data = null } = config

  const xhr = new XMLHttpRequest
}

axios({
  url: '',
  method: "get"
})