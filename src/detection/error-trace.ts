import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectErrorTrace({ errorTrace }: ComponentDict): DetectionResponse {
  if (errorTrace.state !== State.Success) return false
  if (/PhantomJS/i.test(errorTrace.value)) return BotKind.PhantomJS
}
