import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPhantom({
  [SignalKind.PhantomWindowProps]: phantomWindowProps,
}: ComponentDict): DetectionResponse {
  if (phantomWindowProps.state === State.Success && phantomWindowProps.value.includes(true)) {
    return BotKind.PhantomJS
  }
  return false
}
