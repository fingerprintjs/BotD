import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectSelenium({
  [SignalKind.SeleniumDocumentProps]: seleniumDocumentProps,
}: ComponentDict): DetectionResponse {
  if (seleniumDocumentProps.state === State.Success && seleniumDocumentProps.value.includes(true)) {
    return BotKind.Selenium
  }
  return false
}
