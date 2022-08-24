import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectAppVersion({ [SignalKind.AppVersion]: appVersion }: ComponentDict): DetectionResponse {
  if (appVersion.state !== State.Success) return false
  if (/headless/i.test(appVersion.value)) return BotKind.HeadlessChrome
  return false
}
