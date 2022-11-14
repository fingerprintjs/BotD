import { BotdError, State } from '../types'

export default function getOsCpu(): string {
  const oscpu = navigator.oscpu
  if (oscpu == undefined) {
    throw new BotdError(State.Undefined, 'navigator.oscpu is undefined')
  }
  return oscpu
}
