import { SignalKind } from '../signals'
import { getWebDriver } from './web-driver'

export default function getSources() {
  return {
    [SignalKind.WebDriver]: getWebDriver,
  }
}
