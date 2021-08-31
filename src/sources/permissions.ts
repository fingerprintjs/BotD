import { BotdError, State } from '../types'

export default async function arePermissionsInconsistent(): Promise<boolean> {
  if (typeof Notification === 'undefined') throw new BotdError(State.Undefined, 'typeof Notification is undefined')

  const { permissions } = navigator
  if (!permissions) throw new BotdError(State.Undefined, 'navigator.permissions is undefined')

  const permissionStatus = await permissions.query({ name: 'notifications' })
  return Notification.permission === 'denied' && permissionStatus.state === 'prompt'
}
