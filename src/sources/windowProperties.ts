import { getProperties } from './misc'

export default function getWindowProperties(): string[] {
  return getProperties(window)
}
