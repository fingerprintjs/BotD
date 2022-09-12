import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectionResponse {
  if (pluginsLength.state === State.Success && pluginsLength.value === 0) return BotKind.HeadlessChrome
}
