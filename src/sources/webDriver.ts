import { BotdError, State } from '../types'

export default function getWebDriver(): boolean {
  if (navigator.webdriver == undefined) {
    throw new BotdError(State.Undefined, 'navigator.webdriver is undefined')
  }
  return navigator.webdriver
}
