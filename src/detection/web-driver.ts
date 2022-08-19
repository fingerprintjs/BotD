import { SignalKind } from '../signals'
import { ComponentDict, DetectionResponse } from '../types'

export function detectWebDriver(components: ComponentDict): DetectionResponse {
  if (components[SignalKind.WebDriver].value) {
    // BotKind.HeadlessChrome
    return true
  }
  return false
}
