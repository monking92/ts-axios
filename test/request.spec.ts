import axios from '../src'

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
        req.eventBus.trigger('timeoue')
      })
    })
  })
})
