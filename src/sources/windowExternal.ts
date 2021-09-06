import { BotdError, State } from '../types'

export default function getWindowExternal(): string {
  if (window.external === undefined) {
    throw new BotdError(State.Undefined, 'window.external is undefined')
  }
  return window.external.toString()
}
