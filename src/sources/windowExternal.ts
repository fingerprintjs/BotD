export default function getWindowExternal(): string {
  if (window.external === undefined) throw new Error('window.external is undefined')
  return window.external.toString()
}
