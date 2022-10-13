import { BotdError, State } from '../types'
import { getObjectProps } from '../utils/misc'

export default function getDocumentProperties(): string[] {
  if (window.document === undefined) {
    throw new BotdError(State.Undefined, 'window.document is undefined')
  }
  return getObjectProps(window.document)
}
