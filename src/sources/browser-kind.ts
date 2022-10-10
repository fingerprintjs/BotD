import { strIncludes } from '../ponyfills'
import { BotdError, BrowserKind, State } from '../types'

export default function getBrowserKind(): BrowserKind {
  const userAgent = navigator.userAgent?.toLowerCase()
  if (userAgent == undefined) {
    throw new BotdError(State.Undefined, 'navigator.userAgent is undefined')
  }

  if (strIncludes(userAgent, 'wechat')) {
    return BrowserKind.WeChat
  } else if (strIncludes(userAgent, 'firefox')) {
    return BrowserKind.Firefox
  } else if (strIncludes(userAgent, 'opera') || strIncludes(userAgent, 'opr')) {
    return BrowserKind.Opera
  } else if (strIncludes(userAgent, 'chrome')) {
    return BrowserKind.Chrome
  } else if (strIncludes(userAgent, 'safari')) {
    return BrowserKind.Safari
  } else if (strIncludes(userAgent, 'trident') || strIncludes(userAgent, 'msie')) {
    return BrowserKind.IE
  }

  return BrowserKind.Unknown
}
