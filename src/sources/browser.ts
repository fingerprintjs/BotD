import { BrowserEngineKind, BrowserKind } from '../types'
import { getBrowserEngineKind, getBrowserKind, getDocumentFocus, isAndroid } from '../utils/browser'

export default function getBrowserInformation(): BrowserInformation {
  return {
    browserEngineKind: getBrowserEngineKind(),
    browserKind: getBrowserKind(),
    isAndroid: isAndroid(),
    documentFocus: getDocumentFocus(),
  }
}

interface BrowserInformation {
  browserEngineKind: BrowserEngineKind
  browserKind: BrowserKind
  isAndroid: boolean
  documentFocus: boolean
}
