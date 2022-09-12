import { BotdError, BrowserKind, State } from '../types'

export default function getBrowserKind(): BrowserKind {
  const userAgent = navigator.userAgent?.toLowerCase()
  if (userAgent == undefined) {
    throw new BotdError(State.Undefined, 'navigator.userAgent is undefined')
  }

  if (userAgent.includes('firefox')) {
    return BrowserKind.Firefox
  } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
    return BrowserKind.Opera
  } else if (userAgent.includes('chrome')) {
    return BrowserKind.Chrome
  } else if (userAgent.includes('safari')) {
    return BrowserKind.Safari
  } else if (userAgent.includes('trident') || userAgent.includes('msie')) {
    return BrowserKind.IE
  }

  return BrowserKind.Unknown
}
