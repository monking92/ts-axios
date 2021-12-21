import { IAxiosRequestConfig, IAxiosResponse } from '../types'

class AxiosError<T> extends Error {
  // message: string
  config: IAxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: IAxiosResponse<T>

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: XMLHttpRequest,
    response?: IAxiosResponse<T>
  ) {
    super(message)
    // this.message = message
    this.config = config
    this.code = code
    this.request = request
    this.response = response
  }
}

export default function createError<T>(
  message: string,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: XMLHttpRequest,
  response?: IAxiosResponse<T>
): AxiosError<T> {
  const axiosError = new AxiosError<T>(message, config, code, request, response)
  return axiosError
}
