import { replaceNaN, toInt } from '../utils/data'

export interface ScreenResolutionPayload {
  width?: number
  height?: number
}

export default function getScreenResolution(): ScreenResolutionPayload {
  const s = screen

  // Some browsers return screen resolution as strings, e.g. "1200", instead of a number, e.g. 1200.
  // I suspect it's done by certain plugins that randomize browser properties to prevent fingerprinting.
  // Some browsers even return  screen resolution as not numbers.
  const parseDimension = (value: unknown) => replaceNaN(toInt(value), undefined)
  const [height, width] = [parseDimension(s.width), parseDimension(s.height)].sort()

  return {
    width,
    height,
  }
}
