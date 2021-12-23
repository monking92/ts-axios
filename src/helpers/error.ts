import { IAxiosRequestConfig, IAxiosResponse } from '../types'

class AxiosError extends Error {
  // message: string
  config: IAxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: IAxiosResponse

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: XMLHttpRequest,
    response?: IAxiosResponse
  ) {
    super(message)
    // this.message = message
    this.config = config
    this.code = code
    this.request = request
    this.response = response
  }
}

export default function createError(
  message: string,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: XMLHttpRequest,
  response?: IAxiosResponse
): AxiosError {
  const axiosError = new AxiosError(message, config, code, request, response)
  return axiosError
}
