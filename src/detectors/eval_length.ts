import { arrayIncludes } from '../utils/ponyfills'
import { BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectEvalLengthInconsistency({
  evalLength,
  browser: { browserKind: browser, BrowserEngineKind: browserEngine },
}: ComponentDict): DetectorResponse {
  if (evalLength.state !== State.Success) return
  const length = evalLength.value
  return (
    (length === 37 && !arrayIncludes([BrowserEngineKind.Webkit, BrowserEngineKind.Gecko], browserEngine)) ||
    (length === 39 && !arrayIncludes([BrowserKind.IE], browser)) ||
    (length === 33 && !arrayIncludes([BrowserEngineKind.Chromium], browserEngine))
  )
}
