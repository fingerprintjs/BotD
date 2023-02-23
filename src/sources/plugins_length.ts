import { BotdError, State } from '../types'

export default function getPluginsLength(): number {
  if (navigator.plugins === undefined) {
    throw new BotdError(State.Undefined, 'navigator.plugins is undefined')
  }
  if (navigator.plugins.length === undefined) {
    throw new BotdError(State.UnexpectedBehaviour, 'navigator.plugins.length is undefined')
  }
  return navigator.plugins.length
}
