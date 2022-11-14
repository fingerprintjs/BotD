import { BotdError, State } from '../types'
import { replaceNaN, toFloat } from '../utils/data'

export default function getDeviceMemory(): number {
  // `navigator.deviceMemory` is a string containing a number in some unidentified cases
  const deviceMemory = replaceNaN(toFloat(navigator.deviceMemory), undefined)
  if (deviceMemory == undefined) {
    throw new BotdError(State.Undefined, 'navigator.osdeviceMemorycpu is undefined')
  }
  return deviceMemory
}
