import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectLanguagesLengthInconsistency({ languages }: ComponentDict): DetectorResponse {
  if (languages.state === State.Success && languages.value.length === 0) {
    return BotKind.HeadlessChrome
  }
}
