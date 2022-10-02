import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPluginsLengthInconsistency({ isIPad, pluginsLength }: ComponentDict): DetectionResponse {
  if (isIPad.state !== State.Success || pluginsLength.state !== State.Success) return
  // We need to additionally check for mobile Safari, as it has 0 plugins
  if (isIPad.value) return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
