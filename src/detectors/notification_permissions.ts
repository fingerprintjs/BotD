import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserKind } from '../utils/browser'

export function detectNotificationPermissions({ notificationPermissions }: ComponentDict): DetectorResponse {
  const browserKind = getBrowserKind()
  if (browserKind !== BrowserKind.Chrome) return false

  if (notificationPermissions.state === State.Success && notificationPermissions.value) {
    return BotKind.HeadlessChrome
  }
}
