import { getBrowserVersion, isHeadlessChrome, isMobile, isWebKit } from '../../tests/utils'
import { BotdError, BrowserEngineKind, BrowserKind } from '../types'
import { getBrowserEngineKind, getBrowserKind } from '../utils/browser'
import getNotificationPermissions from './notification_permissions'

describe('Sources', () => {
  describe('notificaionPermissions', () => {
    it('returns an expected value or throws', async () => {
      const { major, minor } = getBrowserVersion() ?? { major: 0, minor: 0 }

      if (
        getBrowserKind() === BrowserKind.Safari &&
        getBrowserEngineKind() === BrowserEngineKind.Webkit &&
        (isMobile() || major < 16 || (major === 16 && minor < 5))
      ) {
        let expected = ''

        if (isMobile()) {
          expected = 'window.Notification is undefined'
        } else if (major < 16) {
          expected = 'navigator.permissions is undefined'
        } else {
          expected = 'notificationPermissions signal unexpected behaviour'
        }

        await expectAsync(getNotificationPermissions()).toBeRejectedWithError(BotdError, expected)
        return
      }

      // if (isWebKit() && (major < 16 || (major === 16 && minor < 5))) {
      //   await expectAsync(getNotificationPermissions()).toBeRejectedWithError(
      //     BotdError,
      //     isMobile()
      //       ? 'window.Notification is undefined'
      //       : (getBrowserMajorVersion() ?? 0) < 16
      //       ? 'navigator.permissions is undefined'
      //       : 'notificationPermissions signal unexpected behaviour',
      //   )
      //   return
      // }

      const result = await getNotificationPermissions()

      if (isHeadlessChrome() || isWebKit()) {
        // It's true because HeadlessChrome returns "denied" and not "default".
        expect(result).toBeTrue()
        return
      }

      expect(result).toBeFalse()
    })
  })
})
