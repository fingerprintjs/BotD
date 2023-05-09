import { isHeadlessChrome } from '../../tests/utils'
import getNotificationPermissions from './notification_permissions'

describe('Sources', () => {
  describe('notificaionPermissions', () => {
    it('returns an expected value', async () => {
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
