import checkDistinctiveProperties from './distinctive_properties'

describe('Sources', () => {
  describe('distinctiveProperties', () => {
    it('returns expected values', () => {
      const bots = checkDistinctiveProperties()

      for (const [, result] of Object.entries(bots)) {
        expect(result).toBeFalse()
      }
    })
  })
})
