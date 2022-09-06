import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'
import { includes } from '../utils'

export function detectDocumentProperties({
  [SignalKind.DocumentProps]: documentProps,
}: ComponentDict): DetectionResponse {
  if (documentProps.state !== State.Success) return false
  if (includes(documentProps.value, '__selenium_unwrapped', '__webdriver_evaluate', '__driver_evaluate')) {
    return BotKind.Selenium
  }
  return false
}
