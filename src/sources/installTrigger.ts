export default function getInstallTrigger(): boolean {
  const installTriggerType = typeof window.InstallTrigger
  if (installTriggerType === undefined) throw new Error('undefined')
  return installTriggerType !== 'undefined'
}
