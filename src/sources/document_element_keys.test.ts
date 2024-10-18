import getDocumentElementKeys from './document_element_keys'

describe('Sources', () => {
  describe('documentElementKeys', () => {
    it('returns expected values or throws', () => {
      const result = getDocumentElementKeys()
      // There are no document keys when running the tests using Karma
      expect(result).toEqual([])
    })
  })
})
