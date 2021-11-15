import { BotdError, State } from '../types'

export default function getSABByteLength(): number {
  if (typeof window.SharedArrayBuffer !== 'function') {
    throw new BotdError(State.NotFunction, 'window.SharedArrayBuffer is not a function')
  }
  const singleElementSAB = new window.SharedArrayBuffer(1)
  if (singleElementSAB.byteLength === undefined) {
    throw new BotdError(State.Undefined, 'SharedArrayBuffer.byteLength is undefined')
  }
  return singleElementSAB.byteLength
}
