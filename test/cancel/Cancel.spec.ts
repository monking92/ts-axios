import Cancel from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  it('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled')

    expect(cancel.message).toBe('Operation has been canceled')
  })

  it('should returns true if value is a Cancel', () => {
    expect(Cancel.isCancel(new Cancel())).toBeTruthy()
  })
})
