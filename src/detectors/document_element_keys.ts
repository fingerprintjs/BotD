import { BotKind, ComponentDict, DetectorResponse, State } from '../types'
import { includes } from '../utils/misc'

export function detectDocumentAttributes({ documentElementKeys }: ComponentDict): DetectorResponse {
  if (documentElementKeys.state !== State.Success) return false
  if (includes(documentElementKeys.value, 'selenium', 'webdriver', 'driver')) {
    return BotKind.Selenium
  }
}
