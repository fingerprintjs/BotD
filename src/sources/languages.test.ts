import getLanguages from './languages'

describe('Sources', () => {
  describe('languages', () => {
    it('returns expected values', () => {
      expect(getLanguages().length).toBeGreaterThan(0)
    })
  })
})
