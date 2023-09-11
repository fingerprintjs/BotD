import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectWindowSize({ windowSize, browser }: ComponentDict): DetectorResponse {
  if (windowSize.state !== State.Success || browser.state !== State.Success) return false
  const { outerWidth, outerHeight } = windowSize.value
  const { documentFocus } = browser.value
  // When a page is opened in a new tab without focusing it right away, the window outer size is 0x0
  if (!documentFocus) return
  if (outerWidth === 0 && outerHeight === 0) return BotKind.HeadlessChrome
}
