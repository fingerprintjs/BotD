import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectProcess({ [SignalKind.Process]: process }: ComponentDict): DetectionResponse {
  if (process.state !== State.Success) return false
  if (process.value.type === 'renderer' || process.value.versions?.electron != null) {
    return BotKind.Electron
  }
  return false
}
