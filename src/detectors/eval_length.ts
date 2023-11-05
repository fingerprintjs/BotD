import { arrayIncludes } from '../utils/ponyfills'
import { BrowserEngineKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectEvalLengthInconsistency({
  evalLength,
  browserKind,
  browserEngineKind,
}: ComponentDict): DetectorResponse {
  if (
    evalLength.state !== State.Success ||
    browserKind.state !== State.Success ||
    browserEngineKind.state !== State.Success
  )
    return

  const length = evalLength.value
  if (browserEngineKind.value === BrowserEngineKind.Unknown) return false
  return (
    (length === 37 && !arrayIncludes([BrowserEngineKind.Webkit, BrowserEngineKind.Gecko], browserEngineKind.value)) ||
    (length === 39 && !arrayIncludes([BrowserKind.IE], browserKind.value)) ||
    (length === 33 && !arrayIncludes([BrowserEngineKind.Chromium], browserEngineKind.value))
  )
}
