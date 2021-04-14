export default function isBigEndian(): boolean {
  const buf = new ArrayBuffer(4)
  new Uint32Array(buf)[0] = 0xaa000000
  return new Uint8Array(buf)[0] === 0xaa
}
