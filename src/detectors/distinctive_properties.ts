import { BotKindType, ComponentDict, DetectorResponse, State } from '../types'

export function detectDistinctiveProperties({ distinctiveProps }: ComponentDict): DetectorResponse {
  if (distinctiveProps.state !== State.Success) return false
  const value = distinctiveProps.value
  let bot: BotKindType
  for (bot in value) if (value[bot]) return bot
}
