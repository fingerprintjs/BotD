import { getBrowserMajorVersion, isChromium, isHeadlessChrome } from '../../tests/utils'
import getWebDriver from './webdriver'
import { BotdError } from '../types'

describe('Sources', () => {
  describe('webdriver', () => {
    it('returns an expected value or throws', () => {
      if (isChromium() && (getBrowserMajorVersion() ?? 0) < 63) {
        expect(() => getWebDriver()).toThrow(new BotdError(-1, 'navigator.webdriver is undefined'))
        return
      }

      const result = getWebDriver()

      if (isHeadlessChrome()) {
        expect(result).toBeTrue()
        return
      }

      expect(typeof result).toBe('boolean')
    })
  })
})
