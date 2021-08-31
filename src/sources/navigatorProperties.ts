import { getProperties } from './misc'

export default function getNavigatorProperties(): string[] {
  return getProperties(window.navigator)
}
