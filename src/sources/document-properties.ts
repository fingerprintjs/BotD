import { BotdError, State } from '../types'
import { getObjectProps } from '../utils'

export default function getDocumentProperties() {
  if (window.close === undefined) {
    throw new BotdError(State.Undefined, 'window.document is undefined')
  }
  return getObjectProps(window.document)
}
