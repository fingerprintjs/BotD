import { BotdError, State } from '../types'

export default async function arePermissionsInconsistent(): Promise<boolean> {
  if (Notification === undefined) {
    throw new BotdError(State.Undefined, 'Notification is undefined')
  }
  if (navigator.permissions === undefined) {
    throw new BotdError(State.Undefined, 'navigator.permissions is undefined')
  }
  const { permissions } = navigator
  if (typeof permissions.query !== 'function') {
    throw new BotdError(State.NotFunction, 'navigator.permissions.query is not a function')
  }
  const permissionStatus = await permissions.query({ name: 'notifications' })
  return Notification.permission === 'denied' && permissionStatus.state === 'prompt'
}
