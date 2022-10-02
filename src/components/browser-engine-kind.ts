import { BrowserEngineKind } from '../types'
import { countTruthy } from '../utils'

export default function getBrowserEngineKind(): BrowserEngineKind {
  // Based on research in October 2020. Tested to detect Chromium 42-86.
  const w = window
  const n = navigator

  if (
    countTruthy([
      'webkitPersistentStorage' in n,
      'webkitTemporaryStorage' in n,
      n.vendor.indexOf('Google') === 0,
      'webkitResolveLocalFileSystemURL' in w,
      'BatteryManager' in w,
      'webkitMediaStream' in w,
      'webkitSpeechGrammar' in w,
    ]) >= 5
  ) {
    return BrowserEngineKind.Chromium
  }

  if (
    countTruthy([
      'ApplePayError' in w,
      'CSSPrimitiveValue' in w,
      'Counter' in w,
      n.vendor.indexOf('Apple') === 0,
      'getStorageUpdates' in n,
      'WebKitMediaKeys' in w,
    ]) >= 4
  ) {
    return BrowserEngineKind.Webkit
  }

  if (
    countTruthy([
      'buildID' in navigator,
      'MozAppearance' in (document.documentElement?.style ?? {}),
      'onmozfullscreenchange' in w,
      'mozInnerScreenX' in w,
      'CSSMozDocumentRule' in w,
      'CanvasCaptureMediaStream' in w,
    ]) >= 4
  ) {
    return BrowserEngineKind.Gecko
  }

  return BrowserEngineKind.Unknown
}
