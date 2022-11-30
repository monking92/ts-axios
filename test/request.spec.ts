import axios, { IAxiosResponse, IAxiosError } from '../src'

function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = jasmine.Ajax.requests.mostRecent()
      resolve(request)
    })
  })
}

describe('request', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should treat single string arg as url', () => {
    axios('/foo')

    return getAjaxRequest().then((request) => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  it('should allow string arg as url, and config arg', () => {
    axios.post('/foo')

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/foo')
      expect(req.method).toBe('post')
    })
  })

  it('should allow data', () => {
    axios.delete('/foo', {
      data: { foo: 'bar' }
    })

    return getAjaxRequest().then(req => {
      expect(req.url).toBe('/foo')
      expect(req.params).toEqual(JSON.stringify({ foo: 'bar' }))
    })
  })

  describe('timeout', () => {
    it('should handle timeout', () => {
      axios({
        url: '/foo',
        timeout: 1000
      }).then(() => {
        fail(new Error('timeout error not caught'))
      }, (err) => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.code).toBe('ECONNABORTED')
      })

      return getAjaxRequest().then(req => {
        // req.responseTimeout() // jasmine.clock is not a function
        // @ts-ignore
        req.eventBus.trigger('timeout')
      })
    })
  })

  it('should reject on network errors', () => {
    jasmine.Ajax.uninstall()

    const resolveMock = jest.fn((res: IAxiosResponse) => res)
    const rejectMock = jest.fn((err: IAxiosError) => err)

    function finish(reason: IAxiosError | IAxiosResponse) {
      expect(resolveMock).not.toHaveBeenCalled()
      expect(rejectMock).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as IAxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()
    }

    return axios('/foo')
      .then(resolveMock, rejectMock)
      .then(finish)
  })

  // 未增加覆盖率
  /* it('should reject on abort', () => {
    const resolveMock = jest.fn((res: IAxiosResponse) => res)
    const rejectMock = jest.fn((err: IAxiosError) => err)

    function finish(reason: IAxiosError | IAxiosResponse) {
      expect(resolveMock).not.toHaveBeenCalled()
      expect(rejectMock).toHaveBeenCalled()
      // expect()
    }

    axios('/foo')
      .then(resolveMock, rejectMock)
      .then(finish)

    return getAjaxRequest().then((req) => {
      req.abort()
    })
  }) */

  it('should return JSON when resolved', () => {
    axios('/foo', {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => {
      setTimeout(() => {
        expect(res.data).toEqual({ foo: 'bar' })
      }, 200)
    })

    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{foo: "bar"}'
      })
    })
  })

  it('should return JSON when rejecting', () => {
    axios('/foo', {
      method: 'put',
      headers: {
        'Accept': 'application/json'
      }
    })
    .catch(err => {
      setTimeout(() => {
        expect(err.status).toBe(400)
        expect(err.data.code).toBe(1)
        expect(err.data.error).toBe('Bad request')
      }, 200)
    })

    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{code: 1, error: "Bad request"}'
      })
    })
  })

  it('should supply correct response', () => {
    axios.post('/foo').then(res => {
      setTimeout(() => {
        // @ts-ignore
        expect(res.data.foo).toBe('bar')
        expect(res.status).toBe(200)
        expect(res.statusText).toBe('OK')
        expect(res.headers['content-type'].toBe('application/json'))
      }, 200)
    })

    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })
    })
  })

  // 未增加覆盖率
  /* it('should make cross domain http request', () => {
    axios.post('www.baidu.com/foo').then(res => {
      setTimeout(() => {
        // @ts-ignore
        expect(res.data.foo).toBe('bar')
        expect(res.status).toBe(200)
        expect(res.statusText).toBe('OK')
        expect(res.headers['content-type'].toBe('application/json'))
      }, 200)
    })

    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })
    })
  }) */

  // 未增加覆盖率
  /* it('should allow overriding Content-Type header case-insensitive', () => {
    const contentType = 'application/vnd.myapp.type+json'

    axios.post('/foo', { prop: 'value' }, {
      headers: {
        'Content-Type': contentType
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toEqual(contentType)
    })
  }) */
})
