import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectPluginsLengthInconsistency({
  browserKind,
  isAndroid,
  isDesktopSafari,
  pluginsLength,
}: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success || browserKind.state !== State.Success || isAndroid.state !== State.Success)
    return
  // We need to additionally check for mobile Safari, as it has 0 plugins. Same with mobile opera.
  if (
    (isDesktopSafari.state === State.Success && !isDesktopSafari.value) ||
    (browserKind.value === BrowserKind.Opera && isAndroid.value) ||
    (browserKind.value === BrowserKind.WeChat && isAndroid.value)
  )
    return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
