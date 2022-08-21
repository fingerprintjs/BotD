export default function getNightmareWindowProps(): boolean[] {
  return [window.__nightmare != null]
}
