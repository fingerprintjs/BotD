import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectFunctionBind({ functionBind }: ComponentDict): DetectionResponse {
  if (functionBind.state === State.NotFunction) return BotKind.PhantomJS
}
