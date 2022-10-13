import { BotKind, BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserEngineKind, getBrowserKind, isAndroid, isDesktopSafari } from '../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  const browserKind = getBrowserKind()
  const browserEngineKind = getBrowserEngineKind()
  // Chromium based android browsers and mobile safari have 0 plugins length.
  if (
    (browserEngineKind === BrowserEngineKind.Chromium && isAndroid()) ||
    (browserKind === BrowserKind.Safari && !isDesktopSafari())
  )
    return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
