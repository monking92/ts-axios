import cookies from '../../src/helpers/cookies'

describe('helpers::cookies', () => {
  it('should read cookies', () => {
    document.cookie = 'foo=bar; bar=baz'

    expect(cookies.read('foo')).toBe('bar')
  })
  
  it('should null when cookie name is not exist', () => {
    expect(cookies.read('baz')).toBeNull()
  })
})
