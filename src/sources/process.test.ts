import getProcess from './process'

describe('Sources', () => {
  describe('process', () => {
    it('returns an expected value or throws', () => {
      // This is to make the tests pass locally, because window.process is defined when using Karma
      if (window.process) {
        expect(JSON.stringify(getProcess())).toEqual(
          `{"title":"browser","browser":true,"env":{},"argv":[],"version":"","versions":{}}`,
        )
        return
      }

      expect(() => getProcess())
        .withContext(JSON.stringify(window.process))
        .toThrow()
    })
  })
})
