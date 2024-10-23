import { isHeadlessChrome } from '../../tests/utils'
import { BotdError } from '../types'
import getWebGL from './webgl'

describe('Sources', () => {
  describe('webgl', () => {
    it('returns expected values or throws', () => {
      if (isHeadlessChrome()) {
        expect(() => getWebGL()).toThrow(new BotdError(-4, 'WebGLRenderingContext is null'))
        return
      }

      const result = getWebGL()

      expect(typeof result.renderer).toBe('string')
      expect(result.renderer.length).toBeGreaterThan(0)

      expect(typeof result.vendor).toBe('string')
      expect(result.vendor.length).toBeGreaterThan(0)
    })
  })
})
