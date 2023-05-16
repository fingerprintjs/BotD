import {
  getBrowserVersion,
  getOsMajorVersion,
  isChromium,
  isGecko,
  isMacOS,
  isMobile,
  isWebKit,
} from '../../tests/utils'
import getAppVersion from './app_version'

describe('Sources', () => {
  describe('appVersion', () => {
    it('returns an expected value', () => {
      const value = getAppVersion()
      const version = getBrowserVersion() ?? { major: 0, minor: 0 }

      if (isWebKit()) {
        expect(navigator.userAgent).toContain(value)
        expect(value).toContain(`Version/${version.major}.${version.minor}`)
        return
      }

      if (isChromium()) {
        expect(navigator.userAgent).toContain(value)
        expect(value).toContain(`Chrome/${version.major}.${version.minor}`)
        return
      }

      if (isGecko()) {
        expect(value).toBe(
          `5.0 (${isMacOS() ? 'Macintosh' : !isMobile() ? 'Windows' : 'Android ' + (getOsMajorVersion() ?? 0)})`,
        )
        return
      }

      expect(typeof value).toBe('string')
    })
  })
})
