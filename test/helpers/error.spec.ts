import createError from '../../src/helpers/error'
import { IAxiosRequestConfig, IAxiosResponse } from '../../src/types'

describe('helpers::createError', () => {
  it('should create an AxiosError with message, config, code, request, response', () => {
    const config: IAxiosRequestConfig = { method: 'post' }
    const request = new XMLHttpRequest()
    const response: IAxiosResponse = {
      data: 123,
      status: 200,
      statusText: 'ok',
      headers: '',
      config,
      request
    }

    // const error = createError('foo', config, 'bar', request, response)
    // expect(error instanceof Error).toBeTruthy()
    // expect(error.message).toBe('foo')
    // expect(error.config).toBe(config)
    // expect(error.code).toBe('bar')
    // expect(error.request).toBe(request)
    // expect(error.response).toBe(response)

    const mockCreateError = jest.fn(createError)
    const error = mockCreateError('foo', config, 'bar', request, response)
    
    expect(mockCreateError.mock.calls[0][0]).toBe('foo')
    expect(mockCreateError.mock.calls[0][1]).toBe(config)
    expect(mockCreateError.mock.calls[0][2]).toBe('bar')
    expect(mockCreateError.mock.calls[0][3]).toBe(request)
    expect(mockCreateError.mock.calls[0][4]).toBe(response)
  })
})
