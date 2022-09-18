import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export default function detectMimeTypesConsistent({ mimeTypesConsistent }: ComponentDict): DetectionResponse {
  if (mimeTypesConsistent.state === State.Success && !mimeTypesConsistent.value) {
    return BotKind.Unknown
  }
}
