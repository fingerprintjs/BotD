import { getBrowserMajorVersion, isChromium } from '../../tests/utils'
import { BotdError } from '../types'
import getDocumentElementKeys from './document_element_keys'

describe('Sources', () => {
  describe('documentElementKeys', () => {
    it('returns expected values or throws', () => {
      if (isChromium() && (getBrowserMajorVersion() ?? 0) < 61) {
        expect(() => getDocumentElementKeys()).toThrow(
          new BotdError(-2, 'document.documentElement.getAttributeNames is not a function'),
        )
        return
      }

      const result = getDocumentElementKeys()
      // There are no document keys when running the tests using Karma
      expect(result).toEqual([])
    })
  })
})
