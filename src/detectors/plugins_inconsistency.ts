import { BotKind, BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserEngineKind, getBrowserKind, isAndroid, isDesktopSafari } from '../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  const browserEngineKind = getBrowserEngineKind()
  const browserKind = getBrowserKind()
  // Chromium based android browsers and mobile webkit based browsers have 0 plugins length.
  if (
    (browserEngineKind === BrowserEngineKind.Chromium && isAndroid()) ||
    (browserEngineKind === BrowserEngineKind.Webkit && !isDesktopSafari()) ||
    browserKind === BrowserKind.WeChat
  )
    return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
