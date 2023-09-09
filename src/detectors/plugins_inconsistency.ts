import { BotKind, BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserEngineKind, getBrowserKind, isAndroid } from '../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  const browserKind = getBrowserKind()
  const browserEngineKind = getBrowserEngineKind()
  if (browserKind !== BrowserKind.Chrome || isAndroid() || browserEngineKind !== BrowserEngineKind.Chromium) return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
