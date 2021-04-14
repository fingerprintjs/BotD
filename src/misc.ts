export function getProperties(o: object, p: string[] = []): string[] {
  if (Object.getPrototypeOf(o) == null) return p
  return getProperties(Object.getPrototypeOf(o), p.concat(Object.getOwnPropertyNames(o)))
}
