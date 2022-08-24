import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectRTT({ [SignalKind.RTT]: rtt }: ComponentDict): DetectionResponse {
  if (rtt.state === State.Success && rtt.value === 0) return BotKind.HeadlessChrome
  return false
}
