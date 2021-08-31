import { BotdError, State } from '../types'

export default function getDeviceMemory(): number {
  if (navigator.deviceMemory === undefined) throw new BotdError(State.Undefined, 'navigator.deviceMemory is undefined')
  return navigator.deviceMemory
}
