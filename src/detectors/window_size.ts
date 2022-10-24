import { BotKind, ComponentDict, DetectorResponse, State } from '../types'
import { getDocumentFocus } from '../utils/browser'

export function detectWindowSize({ windowSize }: ComponentDict): DetectorResponse {
  if (windowSize.state !== State.Success) return false
  const { outerWidth, outerHeight } = windowSize.value
  // When a page is opened in a new tab without focusing it right away, the window outer size is 0x0
  if (!getDocumentFocus()) return
  if (outerWidth === 0 && outerHeight === 0) return BotKind.HeadlessChrome
}
