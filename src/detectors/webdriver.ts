import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectWebDriver({ webDriver }: ComponentDict): DetectorResponse {
  if (webDriver.state === State.Success && webDriver.value) return BotKind.HeadlessChrome
}
