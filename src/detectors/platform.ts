import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectPlatform({ platform, userAgent }: ComponentDict): DetectorResponse {
  if (platform.state !== State.Success || userAgent.state !== State.Success) return

  // Xcode Simulator
  if (userAgent.value.match(/Simulator/)) {
    return BotKind.Unknown
  }

  // Platform doesn't match Windows UA
  if (userAgent.value.match(/Windows/) && !platform.value.match(/Win/)) {
    return BotKind.Unknown
  }

  // Platform doesn't match iPhone
  if (userAgent.value.match(/iPhone/) && !platform.value.match(/iPhone/)) {
    return BotKind.Unknown
  }

  // Platform doesn't match Android device (headless Chrome on desktop?)
  if (userAgent.value.match(/Android/) && (platform.value.match(/Win/) || platform.value.match(/Mac/))) {
    return BotKind.Unknown
  }

  return false
}
