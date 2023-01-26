import { BotKind, BrowserKind, ComponentDict, DetectorResponse, State } from '../types'
import { getBrowserKind } from '../utils/browser'

export function detectPluginInconsistencyFirefox({ pluginsNameArray }: ComponentDict): DetectorResponse {
  if (pluginsNameArray.state !== State.Success) return

  // Plugins claim that this is a Firefox, UA says otherwise
  if (pluginsNameArray.value.some((plugin) => plugin.match(/Firefox/)) && getBrowserKind() !== BrowserKind.Firefox) {
    return BotKind.Unknown
  }
}
