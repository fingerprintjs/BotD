import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserKind } from '../utils/browser'

export default function detectProductSub({ productSub }: ComponentDict): DetectorResponse {
  if (productSub.state !== State.Success) return false
  const browserKind = getBrowserKind()
  if (
    (browserKind === BrowserKind.Chrome ||
      browserKind === BrowserKind.Safari ||
      browserKind === BrowserKind.Opera ||
      browserKind === BrowserKind.WeChat) &&
    productSub.value !== '20030107'
  )
    return BotKind.Unknown
}
