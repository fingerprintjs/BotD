export default function requiredAccelerometerPermission(): boolean {
  return typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'
}
