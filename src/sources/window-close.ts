import { BotdError, State } from '../types'

export default function getWindowClose() {
  if (window.close === undefined) {
    throw new BotdError(State.Undefined, 'window.close is undefined')
  }
  return window.close.toString()
}
