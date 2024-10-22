import getWebGL from './webgl'

describe('Sources', () => {
  describe('webgl', () => {
    it('returns expected values or throws', () => {
      const result = getWebGL()

      expect(typeof result.renderer).toBe('string')
      expect(result.renderer.length).toBeGreaterThan(0)

      expect(typeof result.vendor).toBe('string')
      expect(result.vendor.length).toBeGreaterThan(0)
    })
  })
})
