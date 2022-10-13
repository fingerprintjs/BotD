import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserKind, isAndroid, isDesktopSafari } from '../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  // We need to additionally check for mobile Safari, as it has 0 plugins. Same with mobile opera.
  const browserKind = getBrowserKind()
  if (
    isDesktopSafari() ||
    (browserKind === BrowserKind.Opera && isAndroid()) ||
    (browserKind === BrowserKind.WeChat && isAndroid())
  )
    return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
