export default function getInstallTrigger(): boolean {
  return typeof window.InstallTrigger !== 'undefined'
}
