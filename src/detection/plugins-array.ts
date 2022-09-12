import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPluginsArray({ pluginsArray }: ComponentDict): DetectionResponse {
  if (pluginsArray.state === State.Success && !pluginsArray.value) return BotKind.HeadlessChrome
}
