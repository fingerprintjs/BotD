import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPluginsLengthInconsistency({ isDesktopSafari, pluginsLength }: ComponentDict): DetectionResponse {
  if (pluginsLength.state !== State.Success) return
  // We need to additionally check for mobile Safari, as it has 0 plugins
  if (isDesktopSafari.state === State.Success && !isDesktopSafari.value) return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
