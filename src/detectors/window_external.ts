import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectWindowExternal({ windowExternal }: ComponentDict): DetectorResponse {
  if (windowExternal.state !== State.Success) return false
  if (/Sequentum/i.test(windowExternal.value)) return BotKind.Sequentum
}
