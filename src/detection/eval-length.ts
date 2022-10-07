import { arrayIncludes } from '../ponyfills'
import { BrowserKind, ComponentDict, DetectionResponse, State } from '../types'

export function detectEvalLengthInconsistency({ evalLength, browserKind }: ComponentDict): DetectionResponse {
  if (
    evalLength.state !== State.Success ||
    browserKind.state !== State.Success ||
    browserKind.value === BrowserKind.Unknown
  )
    return
  const length = evalLength.value
  const browser = browserKind.value
  return (
    (length === 37 && !arrayIncludes([BrowserKind.Firefox, BrowserKind.Safari], browser)) ||
    (length === 39 && !arrayIncludes([BrowserKind.IE], browser)) ||
    (length === 33 && !arrayIncludes([BrowserKind.Chrome, BrowserKind.Opera], browser))
  )
}
