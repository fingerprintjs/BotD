import { countTruthy } from '../utils'

// Source: FingerprintJS OSS library
// https://github.com/fingerprintjs/fingerprintjs/blob/master/src/utils/browser.ts#L177

/**
 * Checks whether the device is an iPad.
 * It doesn't check that the engine is WebKit and that the WebKit isn't desktop.
 */
export default function isIPad(): boolean {
  // Checked on:
  // Safari on iPadOS (both mobile and desktop modes): 8, 11, 12, 13, 14
  // Chrome on iPadOS (both mobile and desktop modes): 11, 12, 13, 14
  // Safari on iOS (both mobile and desktop modes): 9, 10, 11, 12, 13, 14
  // Chrome on iOS (both mobile and desktop modes): 9, 10, 11, 12, 13, 14

  // Before iOS 13. Safari tampers the value in "request desktop site" mode since iOS 13.
  if (navigator.platform === 'iPad') {
    return true
  }

  const s = screen
  const screenRatio = s.width / s.height

  return (
    countTruthy([
      'MediaSource' in window, // Since iOS 13
      !!Element.prototype.webkitRequestFullscreen, // Since iOS 12
      // iPhone 4S that runs iOS 9 matches this. But it won't match the criteria above, so it won't be detected as iPad.
      screenRatio > 0.65 && screenRatio < 1.53,
    ]) >= 2
  )
}
