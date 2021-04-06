export default function getDeviceMemory(): number {
    if (navigator.deviceMemory === undefined)
        throw new Error('navigator.deviceMemory is undefined');
    return navigator.deviceMemory
}