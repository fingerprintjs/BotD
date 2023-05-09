import { isChromium } from '../../tests/utils'
import getErrorTrace from './error_trace'

describe('Sources', () => {
  describe('errorTrace', () => {
    it('returns an expected value', () => {
      const result = getErrorTrace()

      if (isChromium()) {
        expect(result).toContain("TypeError: Cannot read properties of null (reading '0')")
        return
      }

      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })
  })
})
