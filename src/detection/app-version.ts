import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectAppVersion({ [SignalKind.AppVersion]: appVersion }: ComponentDict): DetectionResponse {
  if (appVersion.state !== State.Success) return false
  if (/headless/i.test(appVersion.value)) return BotKind.HeadlessChrome
  if (/electron/i.test(appVersion.value)) return BotKind.Electron
  if (/slimerjs/i.test(appVersion.value)) return BotKind.SlimerJS
  return false
}
