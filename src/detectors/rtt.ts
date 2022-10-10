import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectRTT({ rtt, isAndroid }: ComponentDict): DetectorResponse {
  if (rtt.state !== State.Success || isAndroid.state !== State.Success) return
  // Rtt is 0 on android webview
  if (isAndroid.value) return
  if (rtt.value === 0) return BotKind.HeadlessChrome
}