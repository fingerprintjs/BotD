export default function getBackdropFilter(): boolean {
  return CSS.supports('backdrop-filter', 'blur(2px)')
}
