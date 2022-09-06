import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectWindowClose({ [SignalKind.WindowClose]: windowClose }: ComponentDict): DetectionResponse {
  if (windowClose.state !== State.Success) return false
  if (/electron/i.test(windowClose.value)) return BotKind.Electron
}
