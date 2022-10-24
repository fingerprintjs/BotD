import { BotdError, State } from '../types'

export default function areMimeTypesConsistent(): boolean {
  if (navigator.mimeTypes === undefined) {
    throw new BotdError(State.Undefined, 'navigator.mimeTypes is undefined')
  }
  const { mimeTypes } = navigator
  let isConsistent = Object.getPrototypeOf(mimeTypes) === MimeTypeArray.prototype
  for (let i = 0; i < mimeTypes.length; i++) {
    isConsistent &&= Object.getPrototypeOf(mimeTypes[i]) === MimeType.prototype
  }
  return isConsistent
}
