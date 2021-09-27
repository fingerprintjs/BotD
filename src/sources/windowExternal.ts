import { BotdError, State } from '../types'

export default function getWindowExternal(): string {
  if (window.external === undefined) {
    throw new BotdError(State.Undefined, 'window.external is undefined')
  }
  const { external } = window
  if (typeof external.toString !== 'function') {
    throw new BotdError(State.NotFunction, 'window.external.toString is not a function')
  }
  return external.toString()
}
