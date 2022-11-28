import { BotKind, BrowserEngineKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserEngineKind, isAndroid, isDesktopSafari } from '../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  const browserEngineKind = getBrowserEngineKind()
  // Chromium based android browsers and mobile webkit based browsers have 0 plugins length.
  if (
    (browserEngineKind === BrowserEngineKind.Chromium && isAndroid()) ||
    (browserEngineKind === BrowserEngineKind.Webkit && !isDesktopSafari())
  )
    return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
