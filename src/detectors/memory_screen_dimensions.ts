import { BotKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectVmFromMemoryScreenDimensions({
  deviceMemory,
  screenDimensions,
}: ComponentDict): DetectorResponse {
  if (deviceMemory.state !== State.Success || screenDimensions.state !== State.Success) return

  // If it's a desktop device with 1GB RAM and screen bigger than 1024x768, it's probably a VM
  if (deviceMemory.value <= 1 && screenDimensions.value.width >= 1024 && screenDimensions.value.height >= 768) {
    return BotKind.Unknown
  }

  return false
}
