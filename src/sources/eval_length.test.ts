import { isChromium } from '../../tests/utils'
import getEvalLength from './eval_length'

describe('Sources', () => {
  describe('evalLength', () => {
    it('returns a positive number', () => {
      const value = getEvalLength()

      if (isChromium()) {
        expect(value).toBe(33)
      } else {
        expect(value).toBe(37)
      }
    })
  })
})
