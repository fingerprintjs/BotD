import { isHeadlessChrome } from '../../tests/utils'
import getWebDriver from './webdriver'

describe('Sources', () => {
  describe('webdriver', () => {
    it('returns an expected value or throws', () => {
      const result = getWebDriver()

      if (isHeadlessChrome()) {
        expect(result).toBeTrue()
        return
      }

      expect(typeof result).toBe('boolean')
    })
  })
})
