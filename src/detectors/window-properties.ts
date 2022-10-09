import { BotKind, ComponentDict, DetectorResponse, State } from '../types'
import { includes } from '../utils'

export function detectWindowProperties({ windowProps }: ComponentDict): DetectorResponse {
  if (windowProps.state !== State.Success) return false
  if (includes(windowProps.value, 'webdriver', 'domAutomation', 'domAutomationController')) {
    return BotKind.HeadlessChrome
  }
  if (includes(windowProps.value, '_selenium', '_Selenium_IDE_Recorder', 'callSelenium')) {
    return BotKind.Selenium
  }
  if (includes(windowProps.value, 'callPhantom', '_phantom', 'phantom')) {
    return BotKind.PhantomJS
  }
  if (includes(windowProps.value, '__nightmare')) return BotKind.Nightmare
  if (includes(windowProps.value, 'emit')) return BotKind.CouchJS
  if (includes(windowProps.value, 'spawn')) return BotKind.Rhino
  if (includes(windowProps.value, 'CefSharp')) return BotKind.CefSharp
}
