import { BotdError, State } from '../types'

export default function getHardwareConcurrency(): number {
  try {
    const concurrency = navigator.hardwareConcurrency
    if (typeof concurrency === 'string') {
      const concurrencyInt = parseInt(concurrency)
      return isNaN(concurrencyInt) ? 1 : concurrencyInt
    }
    return concurrency
  } catch (e) {
    throw new BotdError(State.WrongType, 'navigator.hardwareConcurrency wrong type')
  }
}
