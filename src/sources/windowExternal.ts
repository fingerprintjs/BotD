export default function getWindowExternal(): string {
  if (window.external === undefined) throw new Error('undefined')
  return window.external.toString()
}
