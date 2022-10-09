import { BotdError, State } from '../types'

export default function getRTT(): number {
  if (navigator.connection === undefined) {
    throw new BotdError(State.Undefined, 'navigator.connection is undefined')
  }
  return navigator.connection.rtt
}
