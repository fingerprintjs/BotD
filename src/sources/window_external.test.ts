import { isWebKit } from '../../tests/utils'
import { BotdError } from '../types'
import getWindowExternal from './window_external'

describe('Sources', () => {
  describe('windowExternal', () => {
    it('returns an expected value', () => {
      if (isWebKit()) {
        expect(() => getWindowExternal()).toThrow(new BotdError(-1, 'window.external is undefined'))
        return
      }

      expect(getWindowExternal()).toBe('[object External]')
    })
  })
})
