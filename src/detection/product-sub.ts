import { BotKind, BrowserKind, ComponentDict, DetectionResponse, State } from '../types'

export default function detectProductSub({ browserKind, productSub }: ComponentDict): DetectionResponse {
  if (productSub.state !== State.Success || browserKind.state !== State.Success) return false
  if (
    (browserKind.value == BrowserKind.Chrome ||
      browserKind.value == BrowserKind.Safari ||
      browserKind.value == BrowserKind.Opera) &&
    productSub.value !== '20030107'
  )
    return BotKind.Unknown
}
