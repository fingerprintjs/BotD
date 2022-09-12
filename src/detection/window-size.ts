import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectWindowSize({ windowSize }: ComponentDict): DetectionResponse {
  if (windowSize.state !== State.Success) return false
  const { outerWidth, outerHeight } = windowSize.value
  if (outerWidth === 0 && outerHeight === 0) return BotKind.HeadlessChrome
}
