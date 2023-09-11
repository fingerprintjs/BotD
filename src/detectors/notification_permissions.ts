import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectNotificationPermissions({
  notificationPermissions,
  browser
}: ComponentDict): DetectorResponse {
  if (browser.state !== State.Success || browser.value.browserKind !== BrowserKind.Chrome) return false

  if (notificationPermissions.state === State.Success && notificationPermissions.value) {
    return BotKind.HeadlessChrome
  }
}
