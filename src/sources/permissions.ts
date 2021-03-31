export default async function arePermissionsInconsistent(): Promise<boolean | undefined> {
    if (typeof Notification === 'undefined')
        return undefined

    const { permissions } = navigator
    if (!permissions)
        return undefined

    const permissionStatus = await permissions.query({ name: 'notifications' })
    return Notification.permission === 'denied' && permissionStatus.state === 'prompt'
}