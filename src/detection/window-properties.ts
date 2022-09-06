import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'
import { includes } from '../utils'

export function detectWindowProperties({ [SignalKind.WindowProps]: windowProps }: ComponentDict): DetectionResponse {
  if (windowProps.state !== State.Success) return false
  if (includes(windowProps.value, '__nightmare')) return BotKind.Nightmare
  if (includes(windowProps.value, 'callPhantom', '_phantom', 'phantom')) return BotKind.PhantomJS
  return false
}
