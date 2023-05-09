import getWindowSize from './window_size'

describe('Sources', () => {
  describe('windowExternal', () => {
    it('returns expected values', () => {
      const result = getWindowSize()

      expect(result.innerHeight).toBeGreaterThan(0)
      expect(result.innerWidth).toBeGreaterThan(0)
      expect(result.outerHeight).toBeGreaterThan(0)
      expect(result.outerWidth).toBeGreaterThan(0)
    })
  })
})
