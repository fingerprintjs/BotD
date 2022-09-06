export function getObjectProps(obj: Record<string, any>, props: string[] = []): string[] {
  if (Object.getPrototypeOf(obj) == null) return props
  return getObjectProps(Object.getPrototypeOf(obj), props.concat(Object.getOwnPropertyNames(obj)))
}

export function includes<T>(arr: T[], ...keys: T[]): boolean {
  for (const key of keys) {
    if (arr.includes(key)) return true
  }
  return false
}
