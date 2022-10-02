import { BrowserKind } from '../types'
import { countTruthy } from '../utils'
import getBrowserKind from './browser-kind'

// Source: https://github.com/fingerprintjs/fingerprintjs/blob/master/src/utils/browser.ts#L223

export default function isAndroid(): boolean {
  const browserKind = getBrowserKind()
  const isChromium = browserKind === BrowserKind.Chrome
  const isGecko = browserKind === BrowserKind.Firefox

  // Only 2 browser engines are presented on Android.
  // Actually, there is also Android 4.1 browser, but it's not worth detecting it at the moment.
  if (!isChromium && !isGecko) {
    return false
  }

  const w = window

  // Chrome removes all words "Android" from `navigator` when desktop version is requested
  // Firefox keeps "Android" in `navigator.appVersion` when desktop version is requested
  return (
    countTruthy([
      'onorientationchange' in w,
      'orientation' in w,
      isChromium && !('SharedWorker' in w),
      isGecko && /android/i.test(navigator.appVersion),
    ]) >= 2
  )
}
