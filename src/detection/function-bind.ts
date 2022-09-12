import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectFunctionBind({ [SignalKind.FunctionBind]: functionBind }: ComponentDict): DetectionResponse {
  if (functionBind.state === State.NotFunction) return BotKind.PhantomJS
}
