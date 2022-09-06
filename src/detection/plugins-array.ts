import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPluginsArray({ [SignalKind.PluginsArray]: pluginsArray }: ComponentDict): DetectionResponse {
  if (pluginsArray.state === State.Success && pluginsArray.value) return BotKind.HeadlessChrome
  return false
}
