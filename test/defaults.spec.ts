import axios, { IAxiosTransformerFn } from '../src/index'
import { getAjaxRequest } from './_helpers'
import { deepMerge } from '../src/utils'

describe('defaults', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should transform request json', () => {
    const transformRequest = (axios.defaults.transformRequest as IAxiosTransformerFn[])[0]
    expect(transformRequest.call(axios.defaults, { foo: 'bar' })).toBe('{"foo":"bar"}')
  })

  test('should do nothing to request string', () => {
    const transformRequest = (axios.defaults.transformRequest as IAxiosTransformerFn[])[0]
    expect((transformRequest.call(axios.defaults, 'foo=bar'))).toBe('foo=bar')
  })

  test('should transform response json', () => {
    const transformResponse = (axios.defaults.transformResponse as IAxiosTransformerFn[])[0] //('{"foo":"bar"}')
    const res = transformResponse.call(axios.defaults, '{"foo":"bar"}')
    expect(typeof res).toBe('object')
    expect(res.foo).toBe('bar')
  })

  test('should do nothing to response string', () => {
    const transformResponse = (axios.defaults.transformResponse as IAxiosTransformerFn[])[0] //('{"foo":"bar"}')
    const res = transformResponse.call(axios.defaults, 'foo=bar')
    expect(res).toBe('foo=bar')
  })

  test('should use global defaults config', () => {
    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should use default config for custom instance', () => {
    const instance = axios.create({
      xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
      xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
    })
    document.cookie = instance.defaults.xsrfCookieName + '=foobarbaz'

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('foobarbaz')

      document.cookie = instance.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
    })
  })

  test('should use GET headers', () => {
    axios.defaults.headers.get['X-CUSTOM-HEADER'] = 'foo'
    axios.get('/foo')

    return getAjaxRequest().then(function (request) {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')

      delete axios.defaults.headers.get['X-CUSTOM-HEADER']
    })
  })

  test('should use POST headers', () => {
    axios.defaults.headers.post['X-CUSTOM-HEADER'] = 'foo'
    axios.post('/foo', {})

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-CUSTOM-HEADER']).toBe('foo')

      delete axios.defaults.headers.post['X-CUSTOM-HEADER']
    })
  })

  test('should use header config', () => {
    const instance = axios.create({
      headers: {
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
    })

    instance.get('/foo', {
      headers: {
        'X-FOO-HEADER': 'fooHeaderValue',
        'X-BAR-HEADER': 'barHeaderValue'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders).toEqual(
        deepMerge(axios.defaults.headers.common, axios.defaults.headers.get, {
          'X-COMMON-HEADER': 'commonHeaderValue',
          'X-GET-HEADER': 'getHeaderValue',
          'X-FOO-HEADER': 'fooHeaderValue',
          'X-BAR-HEADER': 'barHeaderValue'
        })
      )
    })
  })
})
