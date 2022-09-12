import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectLanguagesLengthInconsistency({ languages }: ComponentDict): DetectionResponse {
  if (languages.state === State.Success && languages.value.length === 0) {
    return BotKind.HeadlessChrome
  }
}
