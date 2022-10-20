import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectAppVersion({ appVersion }: ComponentDict): DetectorResponse {
  if (appVersion.state !== State.Success) return false
  if (/headless/i.test(appVersion.value)) return BotKind.HeadlessChrome
  if (/electron/i.test(appVersion.value)) return BotKind.Electron
  if (/slimerjs/i.test(appVersion.value)) return BotKind.SlimerJS
}
