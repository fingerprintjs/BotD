import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectFunctionBind({ functionBind }: ComponentDict): DetectorResponse {
  if (functionBind.state === State.NotFunction) return BotKind.PhantomJS
}
