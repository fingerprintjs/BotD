import { BrowserEngineKind } from '../types'
import { getBrowserEngineKind } from '../utils/browser'

export default function collectBrowserEngineKind(): BrowserEngineKind {
  return getBrowserEngineKind()
}
