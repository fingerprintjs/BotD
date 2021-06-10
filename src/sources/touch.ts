export default function getTouchPoints(): number[] {
  return [navigator.maxTouchPoints, navigator.msMaxTouchPoints]
}
