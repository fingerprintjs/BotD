import { isGecko, isWebKit } from '../../tests/utils'
import { BotdError } from '../types'
import getRTT from './rtt'

describe('Sources', () => {
  describe('rtt', () => {
    it('returns an expected value or throws', () => {
      if (isGecko() || isWebKit()) {
        expect(() => getRTT()).toThrow(new BotdError(-1, 'navigator.connection is undefined'))
        return
      }

      const result = getRTT()
      expect(typeof result).toBe('number')
      expect(getRTT() % 25).toBe(0)
    })
  })
})
