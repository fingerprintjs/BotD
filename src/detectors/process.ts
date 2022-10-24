import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectProcess({ process }: ComponentDict): DetectorResponse {
  if (process.state !== State.Success) return false
  if (process.value.type === 'renderer' || process.value.versions?.electron != null) return BotKind.Electron
}
