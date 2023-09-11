import { arrayIncludes } from '../utils/ponyfills'
import { BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectEvalLengthInconsistency({
  evalLength,
  browser: browserComponent,
}: ComponentDict): DetectorResponse {
  if (evalLength.state !== State.Success || browserComponent.state !== State.Success) return

  const { browserKind, browserEngineKind } = browserComponent.value
  const length = evalLength.value
  return (
    (length === 37 && !arrayIncludes([BrowserEngineKind.Webkit, BrowserEngineKind.Gecko], browserEngineKind)) ||
    (length === 39 && !arrayIncludes([BrowserKind.IE], browserKind)) ||
    (length === 33 && !arrayIncludes([BrowserEngineKind.Chromium], browserEngineKind))
  )
}
