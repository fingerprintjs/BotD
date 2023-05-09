import checkDistinctiveProperties from './distinctive_properties'

describe('Sources', () => {
  describe('distinctiveProperties', () => {
    it('returns expected values', () => {
      const bots = checkDistinctiveProperties()

      for (const [name, result] of Object.entries(bots)) {
        expect(result).withContext(`Property: ${name}`).toBeFalse()
      }
    })
  })
})
