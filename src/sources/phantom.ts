export default function getPhantomWindowProps(): boolean[] {
  return [window.callPhantom != null, window._phantom != null, window.phantom != null]
}
