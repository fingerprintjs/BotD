import { BotKind, ComponentDict, DetectorResponse, State } from '../types'
import { includes } from '../utils/misc'

export function detectDocumentProperties({ documentProps }: ComponentDict): DetectorResponse {
  if (documentProps.state !== State.Success) return false
  if (
    includes(
      documentProps.value,
      'selenium',
      '__fxdriver_unwrapped',
      '__selenium_unwrapped',
      '__webdriver_evaluate',
      '__driver_evaluate',
      '__webdriver_unwrapped',
      '__driver_unwrapped',
      '__selenium_evaluate',
      '__webdriver_script_function',
      '__webdriver_script_func',
      '__webdriver_script_fn',
      '__fxdriver_evaluate',
      '__webdriverFunc',
      '$chrome_asyncScriptInfo',
      '__$webdriverAsyncExecutor',
      '__lastWatirAlert',
      '__lastWatirConfirm',
      '__lastWatirPrompt',
      '_WEBDRIVER_ELEM_CACHE',
      'ChromeDriverw',
      'selenium-evaluate',
      '_Selenium_IDE_Recorder',
      /^([a-z]){3}_.*_(Array|Promise|Symbol)$/,
    )
  ) {
    return BotKind.Selenium
  }
}
