import { BotdError, State } from '../types'

export default function getDocumentElementKeys(): string[] {
  if (document.documentElement === undefined) {
    throw new BotdError(State.Undefined, 'document.documentElement is undefined')
  }
  const { documentElement } = document
  if (typeof documentElement.getAttributeNames !== 'function') {
    throw new BotdError(State.NotFunction, 'document.documentElement.getAttributeNames is not a function')
  }
  return documentElement.getAttributeNames()
}
