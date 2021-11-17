import { BotdError, State } from '../types'

export default function isDarkTheme(): boolean {
  if (typeof window.matchMedia !== 'function') {
    throw new BotdError(State.NotFunction, 'window.matchMedia is not a function')
  }
  const query = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(query)
  if (mql.matches === undefined) {
    throw new BotdError(State.Undefined, 'MediaQueryList.matches is undefined')
  }
  return mql.matches
}
