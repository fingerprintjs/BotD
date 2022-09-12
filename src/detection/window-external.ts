import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectWindowExternal({ windowExternal }: ComponentDict): DetectionResponse {
  if (windowExternal.state !== State.Success) return false
  if (/Sequentum/i.test(windowExternal.value)) return BotKind.Sequentum
}
