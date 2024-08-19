import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectRTT({ rtt, android }: ComponentDict): DetectorResponse {
  if (rtt.state !== State.Success || android.state !== State.Success) return
  // Rtt is 0 on android webview
  if (android.value) return
  if (rtt.value === 0) return BotKind.HeadlessChrome
}
