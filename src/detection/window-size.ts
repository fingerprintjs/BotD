import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectWindowSize({ documentFocus, windowSize }: ComponentDict): DetectionResponse {
  if (windowSize.state !== State.Success || documentFocus.state !== State.Success) return false
  const { outerWidth, outerHeight } = windowSize.value
  // When a page is opened in a new tab without focusing it right away, the window outer size is 0x0
  if (!documentFocus.value) return undefined
  if (outerWidth === 0 && outerHeight === 0) return BotKind.HeadlessChrome
}
