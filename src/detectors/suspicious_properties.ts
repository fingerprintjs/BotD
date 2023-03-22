import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectSuspiciousProperties({ suspiciousProps }: ComponentDict): DetectorResponse {
  if (suspiciousProps.state !== State.Success) return false
  const value = suspiciousProps.value
  let bot: BotKind
  for (bot in value) if (value[bot]) return bot
}
