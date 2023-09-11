import { BrowserEngineKind, BrowserKind } from '../types'
import { getBrowserEngineKind, getBrowserKind, getDocumentFocus, isAndroid, isDesktopSafari } from '../utils/browser'

export default function getBrowserInformation(): BrowserInformation {
  return {
    browserEngineKind: getBrowserEngineKind(),
    browserKind: getBrowserKind(),
    isAndroid: isAndroid(),
    isDesktopSafari: isDesktopSafari(),
    documentFocus: getDocumentFocus(),
  }
}

interface BrowserInformation {
  browserEngineKind: BrowserEngineKind
  browserKind: BrowserKind
  isAndroid: boolean
  isDesktopSafari: boolean
  documentFocus: boolean
}
