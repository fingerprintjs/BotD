import { isChromium, isGecko, isWebKit } from '../../tests/utils'
import getProductSub from './product_sub'

describe('Sources', () => {
  describe('productSub', () => {
    it('returns an expected value', () => {
      const result = getProductSub()

      if (isChromium() || isWebKit()) {
        expect(result).toBe('20030107')
        return
      }

      if (isGecko()) {
        expect(result).toBe('20100101')
        return
      }

      expect(typeof result).toBe('string')
    })
  })
})
