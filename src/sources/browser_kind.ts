import { BrowserKind } from '../types'
import { getBrowserKind } from '../utils/browser'

export default function collectBrowserKind(): BrowserKind {
  return getBrowserKind()
}
