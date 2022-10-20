import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectErrorTrace({ errorTrace }: ComponentDict): DetectorResponse {
  if (errorTrace.state !== State.Success) return false
  if (/PhantomJS/i.test(errorTrace.value)) return BotKind.PhantomJS
}
