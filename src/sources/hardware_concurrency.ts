import { BotdError, State } from '../types'
import { replaceNaN, toInt } from '../utils/data'

export default function getHardwareConcurrency(): number | undefined {
  const hardwareConcurrency = replaceNaN(toInt(navigator.hardwareConcurrency), undefined)
  if (hardwareConcurrency == undefined) {
    throw new BotdError(State.Undefined, 'navigator.hardwareConcurrency is undefined')
  }
  return hardwareConcurrency
}
