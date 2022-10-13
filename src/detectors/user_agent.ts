import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectUserAgent({ userAgent }: ComponentDict): DetectorResponse {
  if (userAgent.state !== State.Success) return false
  if (/PhantomJS/i.test(userAgent.value)) return BotKind.PhantomJS
  if (/Headless/i.test(userAgent.value)) return BotKind.HeadlessChrome
  if (/Electron/i.test(userAgent.value)) return BotKind.Electron
  if (/slimerjs/i.test(userAgent.value)) return BotKind.SlimerJS
}
