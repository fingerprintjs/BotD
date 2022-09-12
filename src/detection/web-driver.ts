import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectWebDriver({ webDriver }: ComponentDict): DetectionResponse {
  if (webDriver.state === State.Success && webDriver.value) return BotKind.HeadlessChrome
}
