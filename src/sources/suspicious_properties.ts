import { BotKind } from '../types'
import { getObjectProps, includes } from '../utils/misc'

export type SuspiciousPropertiesPayload = Partial<Record<BotKind, boolean>>

export default function checkSuspiciousProperties(): SuspiciousPropertiesPayload {
  type PropsList = Partial<Record<'window' | 'document', (string | RegExp)[]>>
  // The order in the following list matters, because specific types of bots come first, followed by automation technologies.
  const suspiciousPropsList: Partial<Record<BotKind, PropsList>> = {
    [BotKind.Awesomium]: {
      window: ['awesomium'],
    },
    [BotKind.Cef]: {
      window: ['RunPerfTest'],
    },
    [BotKind.CefSharp]: {
      window: ['CefSharp'],
    },
    [BotKind.CoachJS]: {
      window: ['emit'],
    },
    [BotKind.FMiner]: {
      window: ['fmget_targets'],
    },
    [BotKind.Geb]: {
      window: ['geb'],
    },
    [BotKind.NightmareJS]: {
      window: ['__nightmare', 'nightmare'],
    },
    [BotKind.Phantomas]: {
      window: ['__phantomas'],
    },
    [BotKind.PhantomJS]: {
      window: ['callPhantom', '_phantom'],
    },
    [BotKind.Rhino]: {
      window: ['spawn'],
    },
    [BotKind.Selenium]: {
      window: ['_Selenium_IDE_Recorder', '_selenium', 'calledSelenium', /^([a-z]){3}_.*_(Array|Promise|Symbol)$/],
      document: ['__selenium_evaluate', 'selenium-evaluate', '__selenium_unwrapped'],
    },
    [BotKind.WebDriverIO]: {
      window: ['wdioElectron'],
    },
    [BotKind.WebDriver]: {
      window: [
        'webdriver',
        '__webdriverFunc',
        '__lastWatirAlert',
        '__lastWatirConfirm',
        '__lastWatirPrompt',
        '_WEBDRIVER_ELEM_CACHE',
        'ChromeDriverw',
      ],
      document: [
        '__webdriver_script_fn',
        '__driver_evaluate',
        '__webdriver_evaluate',
        '__fxdriver_evaluate',
        '__driver_unwrapped',
        '__webdriver_unwrapped',
        '__fxdriver_unwrapped',
        '__webdriver_script_fn',
        '__webdriver_script_func',
        '__webdriver_script_function',
        '$cdc_asdjflasutopfhvcZLmcf',
        '$cdc_asdjflasutopfhvcZLmcfl_',
        '$chrome_asyncScriptInfo',
        '__$webdriverAsyncExecutor',
      ],
    },
    [BotKind.HeadlessChrome]: {
      window: ['domAutomation', 'domAutomationController'],
    },
  }
  let botName: BotKind
  const result: SuspiciousPropertiesPayload = {}
  const windowProps = getObjectProps(window)
  let documentProps: string[] = []
  if (window.document !== undefined) documentProps = getObjectProps(window.document)

  for (botName in suspiciousPropsList) {
    const props = suspiciousPropsList[botName]
    if (props !== undefined) {
      const windowContainSuspicious = props.window === undefined ? false : includes(windowProps, ...props.window)
      const documentContainSuspicious =
        props.document === undefined || !documentProps.length ? false : includes(documentProps, ...props.document)
      result[botName] = windowContainSuspicious || documentContainSuspicious
    }
  }

  return result
}
