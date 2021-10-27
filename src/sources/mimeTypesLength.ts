import { BotdError, State } from '../types'

export default function getMimeTypesLength(): number {
  if (navigator.mimeTypes === undefined) {
    throw new BotdError(State.Undefined, 'navigator.mimeTypes is undefined')
  }
  return navigator.mimeTypes.length
}
