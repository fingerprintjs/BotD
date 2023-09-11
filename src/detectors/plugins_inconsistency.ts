import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'

export function detectPluginsLengthInconsistency({
  pluginsLength,
  browser: { browserKind, isAndroid },
}: ComponentDict): DetectorResponse {
  if (pluginsLength.state !== State.Success) return
  if (browserKind !== BrowserKind.Chrome || isAndroid) return
  if (pluginsLength.value === 0) return BotKind.HeadlessChrome
}
