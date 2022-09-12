import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectPermissions({ permissions }: ComponentDict): DetectionResponse {
  if (permissions.state === State.Success && permissions.value) {
    return BotKind.HeadlessChrome
  }
}
