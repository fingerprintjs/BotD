import { BotKind, ComponentDict, DetectionResponse, State } from '../types'
import { includes } from '../utils'

export function detectDocumentAttributes({ documentAttributes }: ComponentDict): DetectionResponse {
  if (documentAttributes.state !== State.Success) return false
  if (includes(documentAttributes.value, 'selenium', 'webdriver', 'driver')) {
    return BotKind.Selenium
  }
}
