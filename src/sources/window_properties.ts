import { getObjectProps } from '../utils/misc'

export default function getWindowProperties(): string[] {
  return getObjectProps(window)
}
