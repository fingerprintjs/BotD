import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserKind, isAndroid } from '../utils/browser'

export function detectPluginsLengthInconsistency({ pluginsLength }: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  const browserKind = getBrowserKind()
  if (browserKind !== BrowserKind.Chrome || isAndroid()) return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
