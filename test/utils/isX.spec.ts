import { isObject, isPlainObject, isDate, isUndefined, isArray, isFormData } from '../../src/utils'

describe('utils:isX', () => {
  it('should validate Object', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject([])).toBeTruthy()
    expect(isObject(null)).toBeFalsy()
  })

  it('should validate PlainObject', () => {
    expect(isPlainObject({})).toBeTruthy()
    expect(isPlainObject([])).toBeFalsy()
    expect(isPlainObject(null)).toBeFalsy()
    expect(isPlainObject(Object.create({}))).toBeFalsy()
  })

  it('should validate Date', () => {
    expect(isDate(new Date())).toBeTruthy()
    expect(isDate(Date.now())).toBeFalsy()
  })

  it('should validate Undefined', () => {
    expect(isUndefined(undefined)).toBeTruthy()
    expect(isUndefined(null)).toBeFalsy()
  })

  it('should validate Array', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray(new Array())).toBeTruthy()
    expect(isArray({ length: 3 })).toBeFalsy()
  })

  it('should validate FormData', () => {
    expect(isFormData(new FormData())).toBeTruthy()
    expect(isFormData({})).toBeFalsy()
  })
})
