import { getBrowserVersion } from '../../tests/utils'
import getUserAgent from './user_agent'

describe('Sources', () => {
  describe('userAgent', () => {
    it('returns an expected value', () => {
      const value = getUserAgent()
      const version = getBrowserVersion() ?? { major: 0, minor: 0 }

      // We do not want to call ua-parser-js in these tests, as those likely
      // use navigator.userAgent internally.
      expect(value).toMatch(new RegExp(`(Version|Chrome|Firefox)/${version.major}.${version.minor}`))
    })
  })
})
