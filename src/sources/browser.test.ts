import { isChromium, isGecko, isMobile, isWebKit } from '../../tests/utils'
import { BrowserEngineKind, BrowserKind } from '../types'
import getBrowserInformation from './browser'

describe('Sources', () => {
  describe('browser', () => {
    it('returns an expected value', () => {
      const value = getBrowserInformation()

      if (isChromium()) {
        expect(value.browserEngineKind).toBe(BrowserEngineKind.Chromium)
        expect(value.browserKind).toBe(BrowserKind.Chrome)
        expect(value.isAndroid).toBe(isMobile())
      }
      if (isGecko()) {
        expect(value.browserEngineKind).toBe(BrowserEngineKind.Gecko)
        expect(value.browserKind).toBe(BrowserKind.Firefox)
        expect(value.isAndroid).toBeFalse()
      }
      if (isWebKit()) {
        expect(value.browserEngineKind).toBe(BrowserEngineKind.Webkit)
        expect(value.browserKind).toBe(BrowserKind.Safari)
        expect(value.isAndroid).toBeFalse()
      }
    })
  })
})
