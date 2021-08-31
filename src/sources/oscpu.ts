import { BotdError, State } from '../types'

export default function getOSCPU(): string {
  if (navigator.oscpu === undefined) throw new BotdError(State.Undefined, 'navigator.oscpu is undefined')
  return navigator.oscpu
}
