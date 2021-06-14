export default function getDeviceMemory(): number {
  if (navigator.deviceMemory === undefined) throw new Error('undefined')
  return navigator.deviceMemory
}
