import { BotdError, State } from '../types'

export default function getPluginNamesArray(): string[] {
  if (navigator.plugins === undefined) {
    throw new BotdError(State.Undefined, 'navigator.plugins is undefined')
  }
  const pll = []
  for (let i = 0; i < navigator.plugins.length; i++) {
    pll.push(navigator.plugins[i].name)
  }
  return pll
}
