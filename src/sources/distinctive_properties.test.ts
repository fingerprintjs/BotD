import checkDistinctiveProperties from './distinctive_properties'

describe('Sources', () => {
  describe('distinctiveProperties', () => {
    it('returns expected values', () => {
      const bots = checkDistinctiveProperties()

      for (const [name, result] of Object.entries(bots)) {
        if (name === 'selenium') {
          // Some browsers are orchestrated with Selenium on BrowserStack
          expect(typeof result)
            .withContext(`Property: ${name}`)
            .toBe('boolean')
        } else {
          expect(result).withContext(`Property: ${name}`).toBeFalse()
        }
      }
    })
  })
})
