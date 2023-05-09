import { isHeadlessChrome, isWebKit } from '../../tests/utils'
import { BotdError } from '../types'
import getNotificationPermissions from './notification_permissions'

describe('Sources', () => {
  describe('notificaionPermissions', () => {
    it('returns an expected value or throws', async () => {
      if (isWebKit()) {
        await expectAsync(getNotificationPermissions()).toBeRejectedWithError(
          BotdError,
          'window.Notification is undefined',
        )
        return
      }

      const result = await getNotificationPermissions()

      if (isHeadlessChrome()) {
        // It's true because HeadlessChrome returns "denied" and not "default".
        expect(result).toBeTrue()
        return
      }

      expect(result).toBeFalse()
    })
  })
})
