import { extend } from '../../src/utils'

describe('utils::extend', () => {
  it('should be mutable', () => {
    const a = Object.create(null)
    const b = { foo: 123 }

    extend(a, b)
    expect(a.foo).toBe(b.foo)
  })

  it('should extend properties', () => {
    let a = { foo: 123, bar: 456 }
    const b = { foo: 789 }

    a = extend(a, b)

    expect(a.foo).toBe(789)
    expect(a.bar).toBe(456)
  })
})
