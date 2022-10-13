import { BotdError, State } from '../types'

export default function getNotificationPermissions(): Promise<boolean> {
  if (window.Notification === undefined) {
    throw new BotdError(State.Undefined, 'window.Notification is undefined')
  }
  if (navigator.permissions === undefined) {
    throw new BotdError(State.Undefined, 'navigator.permissions is undefined')
  }
  const { permissions } = navigator
  if (typeof permissions.query !== 'function') {
    throw new BotdError(State.NotFunction, 'navigator.permissions.query is not a function')
  }
  return new Promise<boolean>((resolve) => {
    navigator.permissions.query({ name: 'notifications' }).then(function (permissionStatus) {
      if (Notification.permission === 'denied' && permissionStatus.state === 'prompt') {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
