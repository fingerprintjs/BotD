import { BotdError, State } from '../types'

export interface ScreenDimensionsPayload {
  width: number
  height: number
}

export default function getScreenDimensions(): ScreenDimensionsPayload {
  if (screen === undefined) {
    throw new BotdError(State.Undefined, 'screen is undefined')
  }
  return { width: screen.width, height: screen.height }
}
