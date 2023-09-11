import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectNotificationPermissions({
  notificationPermissions,
  browserKind,
}: ComponentDict): DetectorResponse {
  if (browserKind.state !== State.Success || browserKind.value !== BrowserKind.Chrome) return false

  if (notificationPermissions.state === State.Success && notificationPermissions.value) {
    return BotKind.HeadlessChrome
  }
}
