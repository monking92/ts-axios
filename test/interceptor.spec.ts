import axios, { IAxiosResponse } from '../src'
import { getAjaxRequest } from './_helpers'

describe('intercepter', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should add a request interceptor', () => {
    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.headers.test = 'added by interceptor'
      return config
    })

    instance('/baz')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test).toBe('added by interceptor')
    })
  })

  it('should add a request interceptor that returns a new config object', () => {
    const instance = axios.create()

    instance.interceptors.request.use(() => {
      return {
        url: '/bar',
        method: 'post'
      }
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.method).toBe('post')
      expect(request.url).toBe('/bar')
    })
  })

  // 未增加覆盖率
  it('should add a request interceptor that returns a promise', (done) => {
    const instance = axios.create()

    instance.interceptors.request.use(config => {
      return new Promise(resolve => {
        // do something async
        setTimeout(() => {
          config.headers.async = 'promise'
          resolve(config)
        }, 10)
      })
    })

    instance('/foo')

    setTimeout(() => {
      getAjaxRequest().then(request => {
        expect(request.requestHeaders.async).toBe('promise')
        done()
      })
    }, 100)
  })

  // 未增加覆盖率
  it('should add multiple request interceptors', () => {
    const instance = axios.create()

    instance.interceptors.request.use(config => {
      config.headers.test1 = '1'
      return config
    })
    instance.interceptors.request.use(config => {
      config.headers.test2 = '2'
      return config
    })
    instance.interceptors.request.use(config => {
      config.headers.test3 = '3'
      return config
    })

    instance('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders.test1).toBe('1')
      expect(request.requestHeaders.test2).toBe('2')
      expect(request.requestHeaders.test3).toBe('3')
      // done()
    })
  })

  it('should add a response interceptor', done => {
    let response: IAxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(res => {
      res.data = res.data + ' - modified by interceptor'
      return res
    })

    instance('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('OK - modified by interceptor')
        done()
      }, 100)
    })
  })

  it('should add a response interceptor that returns a new data object', done => {
    let response: IAxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(res => {
      return {
        data: 'stuff',
        headers: null,
        status: 500,
        statusText: 'ERR',
        request: res.request,
        config: {}
      }
    })

    instance('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('stuff')
        expect(response.headers).toBeNull()
        expect(response.status).toBe(500)
        expect(response.statusText).toBe('ERR')
        expect(response.config).toEqual({})
        done()
      }, 100)
    })
  })

  it('should add a response interceptor that returns a promise', done => {
    let response: IAxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(res => {
      return new Promise(resolve => {
        // do something async
        setTimeout(() => {
          res.data = 'you have been promised!'
          resolve(res)
        }, 10)
      })
    })

    instance('/foo').then(data => {
      response = data
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('you have been promised!')
        done()
      }, 100)
    })
  })

  // 未增加覆盖率
  it('should add multiple response interceptors', done => {
    let response: IAxiosResponse
    const instance = axios.create()

    instance.interceptors.response.use(res => {
      res.data = res.data + '1'
      return res
    })

    instance.interceptors.response.use(res => {
      res.data = res.data + '2'
      return res
    })

    instance.interceptors.response.use(res => {
      res.data = res.data + '3'
      return res
    })

    instance('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('OK123')
        done()
      }, 100)
    })
  })

  it('should allow removing interceptors', done => {
    let response: IAxiosResponse
    let intercept
    const instance = axios.create()

    axios.interceptors.response.use(data => {
      data.data = data.data + '1'
      return data
    })
    intercept = axios.interceptors.response.use(data => {
      data.data = data.data + '2'
      return data
    })
    axios.interceptors.response.use(data => {
      data.data = data.data + '3'
      return data
    })

    axios.interceptors.response.eject(intercept)

    axios('/foo').then(data => {
      response = data
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: 'OK'
      })

      setTimeout(() => {
        expect(response.data).toBe('OK13')
        done()
      }, 100)
    })
  })
})
