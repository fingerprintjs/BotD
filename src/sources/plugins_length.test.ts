import { getBrowserVersion, isChromium, isGecko, isWebKit, isMobile, isHeadlessChrome } from '../../tests/utils'
import getPluginsLength from './plugins_length'

describe('Sources', () => {
  describe('pluginsLength', () => {
    it('returns an expected value', () => {
      const result = getPluginsLength()
      const version = getBrowserVersion() ?? { major: 0, minor: 0 }

      if (isChromium()) {
        if (isHeadlessChrome() || isMobile()) {
          expect(result).toBe(0)
          return
        }

        if (version.major >= 94) {
          expect(result).toBe(5)
          return
        }
      }

      if (isGecko()) {
        if (version.major >= 99) {
          expect(result).toBe(5)
          return
        }
      }

      if (isWebKit()) {
        if (version.major > 16 || (version.major == 16 && version.minor >= 4)) {
          expect(result).toBe(5)
        } else {
          expect(result).toBe(isMobile() ? 0 : 1)
        }

        return
      }
    })
  })
})
