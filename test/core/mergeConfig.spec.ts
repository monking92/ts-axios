import axios from '../../src'
import mergeConfig from '../../src/core/mergeConfig'

const defaults = axios.defaults

describe('core: mergeConfig', () => {
  it('should accept undefined for second argument', () => {
    expect(mergeConfig(defaults, undefined)).toEqual(defaults)
  })

  it('should accept an object for second argument', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults)
  })

  it('should not leave references', () => {
    const merged = mergeConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).not.toBe(defaults.headers)
  })

  it('should allow setting request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merged = mergeConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toEqual(config.data)
  })

  it('should not inherit request options', () => {
    const localDefaults = {
      data: { foo: true }
    }
    const merged = mergeConfig(localDefaults, {})
    expect(merged.data).toBeUndefined()
  })

  it('should return default headers if pass config2 with undefined', () => {
    const config1 = {
      headers: {
        foo: 'bar'
      }
    }
    const merged = mergeConfig(config1, undefined)
    expect(merged).toEqual({
      headers: {
        foo: 'bar'
      }
    })
  })

  it('should set new config for headers without default', () => {
    const config1 = {
      headers: undefined
    }
    const config2 = {
      headers: {
        foo: 'bar'
      }
    }

    const config = {
      headers: {
        foo: 'bar'
      }
    }

    expect(mergeConfig(config1, config2)).toEqual(config)
  })

  it('should allow setting other options', () => {
    const merged = mergeConfig(defaults, { timeout: 123 })
    expect(merged.timeout).toBe(123)
  })

  describe('deepMergeStrategy', () => {
    it('should skip if both config1 and config2 are undefined', () => {
      expect(mergeConfig({ headers: undefined }, { headers: undefined })).toEqual({})
    })
  })
})
