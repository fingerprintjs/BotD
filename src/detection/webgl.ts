import { BotKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectWebGL({ webGL }: ComponentDict): DetectionResponse {
  if (webGL.state === State.Success) {
    const [vendor, renderer] = webGL.value
    if (vendor == 'Brian Paul' && renderer == 'Mesa OffScreen') {
      return BotKind.HeadlessChrome
    }
  }
}
