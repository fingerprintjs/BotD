import { BotdError, State } from '../types'

export default function getProcess(): typeof window.process {
  if (window.process === undefined) {
    throw new BotdError(State.Undefined, 'window.process is undefined')
  }
  return window.process
}
