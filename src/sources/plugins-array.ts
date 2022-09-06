import { BotdError, State } from '../types'

export default function getPluginsArray(): boolean {
  if (navigator.plugins === undefined) {
    throw new BotdError(State.Undefined, 'navigator.plugins is undefined')
  }
  if (window.PluginArray === undefined) {
    throw new BotdError(State.Undefined, 'window.PluginArray is undefined')
  }
  return navigator.plugins instanceof PluginArray
}
