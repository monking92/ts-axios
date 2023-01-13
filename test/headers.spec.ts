import axios from '../src'
import { getAjaxRequest } from './_helpers'

describe('headers', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  // 未增加覆盖率
  /* it('should default common headers', () => {
    const headers = axios.defaults.headers.common

    axios('/foo')

    return getAjaxRequest().then(request => {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(request.requestHeaders[key]).toBe(headers[key])
        }
      }
    })
  }) */

  // 未增加覆盖率
  /* it('should add extra headers for post', () => {
    const headers = axios.defaults.headers.common

    axios.post('/foo', 'fizz=buzz')

    return getAjaxRequest().then(request => {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          // expect(request.requestHeaders[key]).toBe(headers[key])
          expect(request.requestHeaders['Content-Type']).toBe('application/x-www-form-urlencoded')
        }
      }
    })
  }) */

  // 未增加覆盖率
  it('should use application/json when posting an object', () => {
    axios.post('/foo/bar', {
      firstName: 'foo',
      lastName: 'bar'
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/json;charset=UTF-8')
    })
  })

  // 未增加覆盖率
  it('should remove content-type if data is empty', () => {
    axios.post('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBeUndefined()
    })
  })

  // 未增加覆盖率
  it('should preserve content-type if data is false', () => {
    axios.post('/foo', false)

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/x-www-form-urlencoded')
    })
  })

  it('should remove content-type if data is FormData', () => {
    const formData = new FormData()
    formData.append('foo', 'bar')

    axios.post('/foo', formData)

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBeUndefined()
    })
  })
})
