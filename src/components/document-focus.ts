import { BotdError, State } from '../types'

export default function getDocumentFocus(): boolean {
  if (document.hasFocus === undefined) {
    throw new BotdError(State.Undefined, 'document.hasFocus is undefined')
  }
  return document.hasFocus()
}
