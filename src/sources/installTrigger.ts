export default function getInstallTrigger(): boolean {
  const installTriggerType = typeof window.InstallTrigger
  if (installTriggerType === undefined) throw new Error('typeof returned undefined')
  return installTriggerType !== 'undefined'
}
