import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectPluginsArray({ pluginsArray }: ComponentDict): DetectorResponse {
  if (pluginsArray.state === State.Success && !pluginsArray.value) return BotKind.HeadlessChrome
}
