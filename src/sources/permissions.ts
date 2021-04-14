export default async function arePermissionsInconsistent(): Promise<boolean> {
  if (typeof Notification === 'undefined') throw new Error('Notification is undefined')

  const { permissions } = navigator
  if (!permissions) throw new Error('navigator.permissions is undefined')

  const permissionStatus = await permissions.query({ name: 'notifications' })
  return Notification.permission === 'denied' && permissionStatus.state === 'prompt'
}
