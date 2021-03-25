export default async function arePermissionsInconsistent(): Promise<boolean | undefined> {
    const { permissions } = navigator
    if (!permissions) {
        return undefined
    }
    const permissionStatus = await permissions.query({ name: 'notifications' })
    if (typeof Notification === 'undefined') {
        return undefined
    }
    return Notification.permission === 'denied' && permissionStatus.state === 'prompt'
}