import { BotdError, State } from '../types'

export interface ProcessPayload {
  type?: string
  versions?: {
    electron?: string
  }
}

export default function getProcess(): ProcessPayload {
  if (window.process === undefined) {
    throw new BotdError(State.Undefined, 'window.process is undefined')
  }
  return <ProcessPayload>window.process
}
