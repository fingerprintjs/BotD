import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectPermissions({ permissions }: ComponentDict): DetectorResponse {
  if (permissions.state === State.Success && permissions.value) {
    return BotKind.HeadlessChrome
  }
}
