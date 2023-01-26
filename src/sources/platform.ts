import { BotdError, State } from '../types'

export default function getPlatform(): string {
  if (navigator.platform === undefined) {
    throw new BotdError(State.Undefined, 'navigator.platform is undefined')
  }
  return navigator.platform
}
