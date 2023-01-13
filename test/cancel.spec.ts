import axios from '../src'
import Cancel from '../src/cancel/Cancel'
import CancelToken from '../src/cancel/CancelToken'
import { getAjaxRequest } from './_helpers'

describe('cancel', () => {
  describe('when called before sending request', () => {
    test('rejects Promise with a Cancel object', () => {
      const source = CancelToken.source()
      source.cancel('Operation has been canceled.')

      return axios.get('/foo', {
        cancelToken: source.token
      }).catch(err => {
        expect(err).toEqual(expect.any(Cancel))
        expect(err.message).toBe('Operation has been canceled.')
      })
    })
  })

  describe('when called after request has been sent', () => {
    test('rejects Promise with a Cancel Object', (done) => {
      const source = CancelToken.source()

      axios.get('/foo', {
        cancelToken: source.token
      }).catch(err => {
        expect(err).toEqual(expect.any(Cancel))
        expect(err.message).toBe('Operation has been canceled.')
        done()
      })

      getAjaxRequest().then(request => {
        source.cancel('Operation has been canceled.')
      })
    })
  })
})
