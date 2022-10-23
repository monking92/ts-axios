import { deepMerge } from '../../src/utils'

describe('utils:deepMerge', () => {
  it('should be immutable', () => {
    const a: any = {}
    const b: any = { foo: 123 }
    const c: any = { bar: 456 }

    deepMerge(a, b, c)

    expect(a.foo).toBeUndefined()
    expect(a.bar).toBeUndefined()
    expect(b.bar).toBeUndefined()
    expect(c.foo).toBeUndefined()
  })

  it('should merge properties', () => {
    const a: any = { foo: 123 }
    const b: any = { bar: 456 }
    const c: any = { foo: 789 }
    const d: any = deepMerge(a, b, c)

    expect(d.foo).toBe(789)
    expect(d.bar).toBe(456)
  })

  it('should merge recursively', () => {
    const a: any = { foo: { bar: 123 } }
    const b: any = { foo: { baz: 456 }, bar: { qux: 789 } }
    const c = deepMerge(a, b)

    expect(c).toEqual({
      foo: { bar: 123, baz: 456 },
      bar: { qux: 789 }
    })
  })

  it('should remove all references from nested objects', () => {
    const a = { foo: { bar: 123 } }
    const b = {}
    const c = deepMerge(a, b)

    expect(c).toEqual({
      foo: { bar: 123 }
    })

    expect(c.foo).not.toBe(a.foo)
  })

  it('handles null and undefined arguments', () => {
    expect(deepMerge(undefined, undefined)).toEqual({})
    expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
    expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

    expect(deepMerge(null, null)).toEqual({})
    expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
    expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
  })

  it('should replace properties with array', () => {
    expect(deepMerge({}, { foo: [1, 2] })).toEqual({ foo: [1, 2]})
    expect(deepMerge({ foo: 1 }, { foo: [1, 2] })).toEqual({ foo: [1, 2]})
    expect(deepMerge({ foo: { bar: 1 } }, { foo: [1, 2] })).toEqual({ foo: [1, 2] })
  })

  it('should replace properties with cloned array', () => {
    const a = [1, 2]
    const b = deepMerge({}, { a })

    expect(b).toEqual({ a: [1, 2 ]})
    expect(b.a).not.toBe(a)
  })
})
