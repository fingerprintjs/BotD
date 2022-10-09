import { BotdError, State } from '../types'

export function getMozAppearanceSupport(): boolean {
  if (window.CSS === undefined) {
    throw new BotdError(State.Undefined, 'window.CSS is undefined')
  }
  return CSS.supports('-moz-appearance', 'auto')
}
