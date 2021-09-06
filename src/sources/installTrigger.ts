import { BotdError, State } from '../types'

export default function getInstallTrigger(): boolean {
  const installTriggerType = typeof window.InstallTrigger
  if (installTriggerType === undefined) {
    throw new BotdError(State.Undefined, 'typeof window.InstallTrigger is undefined')
  }
  return installTriggerType !== 'undefined'
}
