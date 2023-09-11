import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectNotificationPermissions({
  notificationPermissions,
  browser: { browserKind },
}: ComponentDict): DetectorResponse {
  if (browserKind !== BrowserKind.Chrome) return false

  if (notificationPermissions.state === State.Success && notificationPermissions.value) {
    return BotKind.HeadlessChrome
  }
}
