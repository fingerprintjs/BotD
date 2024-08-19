import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectProductSub({ productSub, browserKind }: ComponentDict): DetectorResponse {
  if (productSub.state !== State.Success || browserKind.state !== State.Success) return false
  if (
    (browserKind.value === BrowserKind.Chrome ||
      browserKind.value === BrowserKind.Safari ||
      browserKind.value === BrowserKind.Opera ||
      browserKind.value === BrowserKind.WeChat) &&
    productSub.value !== '20030107'
  ) {
    return BotKind.Unknown
  } else if (browserKind == BrowserKind.Firefox && productSub.value === '20030107') {
    return BotKind.Unknown
  }
}
