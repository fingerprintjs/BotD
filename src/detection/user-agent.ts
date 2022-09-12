import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectUserAgent({ [SignalKind.UserAgent]: userAgent }: ComponentDict): DetectionResponse {
  if (userAgent.state !== State.Success) return false
  if (/PhantomJS/i.test(userAgent.value)) return BotKind.PhantomJS
  if (/Headless/i.test(userAgent.value)) return BotKind.HeadlessChrome
  if (/Electron/i.test(userAgent.value)) return BotKind.Electron
  if (/slimerjs/i.test(userAgent.value)) return BotKind.SlimerJS
}
