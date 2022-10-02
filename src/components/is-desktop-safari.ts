import { BotdError, BrowserEngineKind, State } from '../types'
import { countTruthy } from '../utils'
import getBrowserEngineKind from './browser-engine-kind'

export default function isDesktopSafari(): boolean {
  const browserEngineKind = getBrowserEngineKind()

  if (browserEngineKind !== BrowserEngineKind.Webkit) {
    throw new BotdError(State.WrongType, 'Browser engine is not Webkit')
  }

  const w = window

  return (
    countTruthy([
      'safari' in w, // Always false in Karma and BrowserStack Automate
      !('DeviceMotionEvent' in w),
      !('ongestureend' in w),
      !('standalone' in navigator),
    ]) >= 3
  )
}
