import { processHeaders, parseResponseHeaders, flatHeaders } from '../../src/helpers/headers'

describe('helpers::headers', () => {
  describe('processHeaders', () => {
    it('should normalize header key', () => {
      const headers = {
        'accept': 'application/json;charset=UTF-8',
        'content-type': 'application/json;charset=UTF-8'
      }
  
      processHeaders(headers, 'accept')
      expect(headers['accept']).toBeUndefined()
      expect(headers['Accept']).toBe('application/json;charset=UTF-8')
      expect(headers['content-type']).toBeUndefined()
      expect(headers['Content-Type']).toBe('application/json;charset=UTF-8')
    })
  
    it('should set Content-Type=application/json;charset=UTF-8 when data isPlainObject() is true and has not set Content-Type', () => {
      const headers = {}
      const data = {
        foo: 'bar'
      }
  
      processHeaders(headers, data)
      expect(headers['Content-Type']).toBe('application/json;charset=UTF-8')
    })
  })

  describe('parseResponseHeaders', () => {
    it('should return header when header is not a valid value', () => {
      expect(parseResponseHeaders(null)).toBeNull()
      expect(parseResponseHeaders('')).toBe('')
    })

    it('should parse response headers', () => {
      const date = new Date()
      const parsed = parseResponseHeaders(`
        Date: ${date.toISOString()}\r\n
        Content-Type: application/json\r\n
        Connection: keep-alive\r\n
        Transfer-Encoding: chunked
      `)

      expect(parsed['date']).toBe(date.toISOString())
      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['transfer-encoding']).toBe('chunked')
    })
  })

  describe('flatHeaders', () => {
    it('should flat headers', () => {
      const headers = {
        'Accept': 'application/json',
        common: {
          'Cache-Control': 'no-cache'
        },
        get: {
          'Accept-Encoding': 'gzip, deflate, br'
        },
        post: {
          'Cache-Control': 'cache'
        }
      }

      expect(flatHeaders(headers, 'get')).toEqual({
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br'
      })

      expect(flatHeaders(headers, 'post')).toEqual({
        'Accept': 'application/json',
        'Cache-Control': 'cache'
      })
    })

    it('should flat headers without common headers', () => {
      const headers = {
        'Accept': 'application/json',
        post: {
          'Cache-Control': 'cache'
        }
      }

      expect(flatHeaders(headers, 'put')).toEqual({
        'Accept': 'application/json'
      })
    })

    it('should return itself when headers is undefined or null', () => {
      expect(flatHeaders(undefined, 'get')).toBeUndefined()
      expect(flatHeaders(null, 'post')).toBeNull()
    })
  })
})
