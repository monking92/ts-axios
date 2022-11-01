import { buildURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    it('should return url without params', () => {
      expect(buildURL('baidu.com')).toBe('baidu.com')
    })

    it('should buildURL with params', () => {
      const params = {
        foo: 'bar'
      }

      expect(buildURL('baidu.com', params)).toBe('baidu.com?foo=bar')
    })

    it('should buildURL with null or undefined', () => {
      const params = {
        foo: undefined,
        bar: null
      }

      expect(buildURL('baidu.com', params)).toBe('baidu.com')
    })

    it('should buildURL with object params', () => {
      const params = {
        foo: {
          bar: 'baz'
        }
      }

      expect(buildURL('baidu.com', params)).toBe(`baidu.com?${encodeURI('foo')}=${encodeURI(JSON.stringify(params.foo))}`)
    })

    it('should buildURL with array params', () => {
      const params = {
        foo: ['bar', 'baz']
      }

      expect(buildURL('baidu.com', params)).toBe('baidu.com?foo[]=bar&foo[]=baz')
    })

    it('should buildURL with date params', () => {
      const date = new Date()
      const params = {
        date
      }

      expect(buildURL('baidu.com', params)).toBe(`baidu.com?date=${date.toISOString()}`)
    })

    it('should buildURL with special char params', () => {
      const params = {
        foo: ':$, '
      }

      expect(buildURL('baidu.com', params)).toBe('baidu.com?foo=:$,+')
    })

    it('should buildURL with existing params', () => {
      const params = {
        bar: 'baz'
      }

      expect(buildURL('baidu.com?foo=bar', params)).toBe('baidu.com?foo=bar&bar=baz')
    })

    it('should buildURL which url contain hash mark', () => {
      const params = {
        bar: 'baz'
      }

      expect(buildURL('baidu.com?foo=bar#hash', params)).toBe('baidu.com?foo=bar&bar=baz')
    })
  })

  describe('isURLSameOrigin', () => {
    it('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    it('should detect different origin', () => {
      expect(isURLSameOrigin('https://www.baidu.com')).toBeFalsy()
    })
  })
})
