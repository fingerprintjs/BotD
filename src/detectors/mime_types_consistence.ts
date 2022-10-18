import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export default function detectMimeTypesConsistent({ mimeTypesConsistent }: ComponentDict): DetectorResponse {
  if (mimeTypesConsistent.state === State.Success && !mimeTypesConsistent.value) {
    return BotKind.Unknown
  }
}
