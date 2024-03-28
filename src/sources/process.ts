import { BotdError, State } from '../types'

export interface ProcessPayload {
  type?: string
  versions?: {
    electron?: string
  }
}

export default function getProcess(): ProcessPayload {
  const { process } = window
  const errorPrefix = 'window.process is'
  if (process === undefined) {
    throw new BotdError(State.Undefined, `${errorPrefix} undefined`)
  }
  if (process && typeof process !== 'object') {
    throw new BotdError(State.UnexpectedBehaviour, `${errorPrefix} not an object`)
  }
  return <ProcessPayload>process
}
