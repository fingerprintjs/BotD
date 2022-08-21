import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectNightmare({
  [SignalKind.NightmareWindowProps]: nightmareWindowProps,
}: ComponentDict): DetectionResponse {
  if (nightmareWindowProps.state === State.Success && nightmareWindowProps.value.includes(true)) {
    return BotKind.Nightmare
  }
  return false
}
