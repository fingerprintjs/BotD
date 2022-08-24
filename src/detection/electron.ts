import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectElectronProcessProps({
  [SignalKind.ElectronProcessProps]: electronProcessProps,
}: ComponentDict): DetectionResponse {
  if (electronProcessProps.state === State.Success && electronProcessProps.value.includes(true)) {
    return BotKind.Electron
  }
  return false
}
