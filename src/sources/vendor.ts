import { BotdError, State } from '../types'

export default function getVendor(): string {
  const vendor = navigator.vendor
  if (vendor == undefined) {
    throw new BotdError(State.Undefined, 'navigator.vendor is undefined')
  }
  return vendor
}
