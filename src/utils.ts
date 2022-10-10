import { arrayFind, arrayIncludes } from './ponyfills'

export function getObjectProps(obj: Record<string, any>, props: string[] = []): string[] {
  if (Object.getPrototypeOf(obj) == null) return props
  return getObjectProps(Object.getPrototypeOf(obj), props.concat(Object.getOwnPropertyNames(obj)))
}

export function includes(arr: string[], ...keys: (string | RegExp)[]): boolean {
  for (const key of keys) {
    if (typeof key === 'string') {
      if (arrayIncludes(arr, key)) return true
    } else {
      const match = arrayFind(arr, (value) => key.test(value))
      if (match != null) return true
    }
  }
  return false
}

export function countTruthy(values: unknown[]): number {
  return values.reduce<number>((sum, value) => sum + (value ? 1 : 0), 0)
}
