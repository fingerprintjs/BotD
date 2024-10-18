import { getBrowserEngineVersion } from '../../tests/utils'
import getUserAgent from './user_agent'

describe('Sources', () => {
  describe('userAgent', () => {
    it('returns an expected value', () => {
      const value = getUserAgent()
      const version = getBrowserEngineVersion() ?? { major: 0, minor: 0 }
      expect(value).toMatch(new RegExp(`(Safari|Chrome|Firefox)/${version.major}.${version.minor}`))
    })
  })
})
