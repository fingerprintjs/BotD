import getFunctionBind from './function_bind'

describe('Sources', () => {
  describe('functionBind', () => {
    it('returns expected values', () => {
      const value = getFunctionBind()

      // Firefox and Safari add extra new lines and some whitespace.
      expect(value.replace(/\s+/g, ' ')).toBe('function bind() { [native code] }')
    })
  })
})
