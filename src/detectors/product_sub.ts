import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectProductSub({ productSub, browser }: ComponentDict): DetectorResponse {
  if (productSub.state !== State.Success || browser.state !== State.Success) return false
  const { browserKind } = browser.value
  if (
    (browserKind === BrowserKind.Chrome ||
      browserKind === BrowserKind.Safari ||
      browserKind === BrowserKind.Opera ||
      browserKind === BrowserKind.WeChat) &&
    productSub.value !== '20030107'
  )
    return BotKind.Unknown
}
