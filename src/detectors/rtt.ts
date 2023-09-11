import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectRTT({ rtt, browser }: ComponentDict): DetectorResponse {
  if (rtt.state !== State.Success || browser.state !== State.Success) return
	const { isAndroid } = browser.value
  // Rtt is 0 on android webview
  if (isAndroid) return
  if (rtt.value === 0) return BotKind.HeadlessChrome
}
