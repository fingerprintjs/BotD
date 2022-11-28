import { arrayIncludes } from '../utils/ponyfills'
import { BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserEngineKind, getBrowserKind } from '../utils/browser'

export function detectEvalLengthInconsistency({ evalLength }: ComponentDict): DetectorResponse {
  if (evalLength.state !== State.Success) return
  const length = evalLength.value
  const browser = getBrowserKind()
  const browserEngine = getBrowserEngineKind()
  return (
    (length === 37 && !arrayIncludes([BrowserEngineKind.Webkit, BrowserEngineKind.Gecko], browserEngine)) ||
    (length === 39 && !arrayIncludes([BrowserKind.IE], browser)) ||
    (length === 33 && !arrayIncludes([BrowserEngineKind.Chromium], browserEngine))
  )
}
