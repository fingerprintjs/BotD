import { BotdError, State } from '../types'

export default function getDocumentAttributes(): string[] {
  if (document.documentElement === undefined) {
    throw new BotdError(State.Undefined, 'document.documentElement is undefined')
  }
  const names = Array.from(document.documentElement.attributes).map((r) => r.name)
  return names
}
