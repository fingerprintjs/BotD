export default function getRTT(): number {
  if (navigator.connection === undefined) throw new Error('undefined')
  return navigator.connection.rtt
}
