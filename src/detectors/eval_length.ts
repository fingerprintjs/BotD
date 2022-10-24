import { arrayIncludes } from '../utils/ponyfills'
import { BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserKind } from '../utils/browser'

export function detectEvalLengthInconsistency({ evalLength }: ComponentDict): DetectorResponse {
  if (evalLength.state !== State.Success) return
  const length = evalLength.value
  const browser = getBrowserKind()
  return (
    (length === 37 && !arrayIncludes([BrowserKind.Firefox, BrowserKind.Safari], browser)) ||
    (length === 39 && !arrayIncludes([BrowserKind.IE], browser)) ||
    (length === 33 && !arrayIncludes([BrowserKind.Chrome, BrowserKind.Opera, BrowserKind.WeChat], browser))
  )
}
