import { BotdError, State } from '../types'

export default function isHiDPI(): boolean {
  if (typeof window.matchMedia !== 'function') {
    throw new BotdError(State.NotFunction, 'window.matchMedia is not a function')
  }
  const query = '(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
  const mql = window.matchMedia(query)
  if (mql.matches === undefined) {
    throw new BotdError(State.Undefined, 'MediaQueryList.matches is undefined')
  }
  return mql.matches
}
