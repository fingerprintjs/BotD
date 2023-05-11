import getWindowSize from './window_size'

describe('Sources', () => {
  describe('windowSize', () => {
    it('returns expected values', () => {
      const result = getWindowSize()

      expect(result.innerHeight).toBeGreaterThan(0)
      expect(result.innerWidth).toBeGreaterThan(0)
      expect(result.outerHeight).toBeGreaterThanOrEqual(0)
      expect(result.outerWidth).toBeGreaterThanOrEqual(0)
    })
  })
})
