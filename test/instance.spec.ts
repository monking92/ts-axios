import axios from '../src'
import { getAjaxRequest } from './_helpers'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should make a http request without verb helper', () => {
    const instance = axios.create()

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  it('should make a http request', () => {
    const instance = axios.create()

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('get')
      expect(request.url).toBe('/foo')
    });
  })

  // 未增加覆盖率
  it('shoule make a post request', () => {
    const instance = axios.create()

    instance.post('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('post')
    })
  })

  it('shoule make a put request', () => {
    const instance = axios.create()

    instance.put('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('put')
    })
  })

  it('shoule make a patch request', () => {
    const instance = axios.create()

    instance.patch('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })

  it('shoule make a options request', () => {
    const instance = axios.create()

    instance.options('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('options')
    })
  })

  it('shoule make a delete request', () => {
    const instance = axios.create()

    instance.delete('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('delete')
    })
  })

  it('shoule make a head request', () => {
    const instance = axios.create()

    instance.head('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('head')
    })
  })

  // 未增加覆盖率
  /* it('should use instance options', () => {
    const instance = axios.create({ timeout: 1000 })

    instance.get('/foo')

    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  }) */

  it('should have defaults.headers', () => {
    const instance = axios.create({
      timeout: 2000
    })

    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  it('should have interceptors on the instance', () => {
    axios.interceptors.request.use(config => {
      config.timeout = 1000
      return config
    })

    const instance = axios.create()
    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    instance.get('/foo').then(response => {
      setTimeout(() => {
        expect(response.config.timeout).toEqual(0)
        expect(response.config.withCredentials).toBeTruthy()
      }, 100)
    })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  it('should correctly discard url hash mark', () => {
    const instance = axios.create()
    const options = {
      // method: 'get',
      url: 'foo/bar?foo=bar#hash',
      params: {
        name: 'axios'
      }
    }

    instance(options)

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('foo/bar?foo=bar&name=axios')
    })
  })
})
