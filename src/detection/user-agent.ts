import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectUserAgent({ [SignalKind.UserAgent]: userAgent }: ComponentDict): DetectionResponse {
  if (userAgent.state === State.Success && /HeadlessChrome/.test(userAgent.value)) {
    return BotKind.HeadlessChrome
  }
  return false
}
